package com.fridge.service.impl;

import com.fridge.graphql.error.BadCredentialsException;
import com.fridge.graphql.error.NoSuchElementException;
import com.fridge.graphql.inputs.ItemInput;
import com.fridge.graphql.inputs.NutritionalValueInput;
import com.fridge.graphql.inputs.ProductInput;
import com.fridge.model.Category;
import com.fridge.model.Item;
import com.fridge.model.Product;
import com.fridge.repository.CategoryRepository;
import com.fridge.repository.ItemRepository;
import com.fridge.repository.ProductRepository;
import com.fridge.service.ProductService;
import com.fridge.util.ObjectMapperUtils;
import com.fridge.util.UpdateReflection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ItemRepository itemRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public Product getProduct(Long id, String userId) {
        Optional<Product> product = productRepository.getByIdAndUserId(id, userId);
        if (product.isEmpty()) {
            throw new NoSuchElementException("Could not find Product with ID " + id);
        }
        return product.get();
    }

    @Override
    public Set<Product> fetchProducts(String userId) {
        return productRepository.getAllByUserId(userId);
    }

    @Override
    public Product saveProduct(ProductInput productInput) {
        // Create product
        Product product = ObjectMapperUtils.map(productInput, Product.class);

        Set<Long> categoryInputSet = productInput.getCategoryIds();
        if (categoryInputSet != null && categoryInputSet.size() > 0)
            for (Long categoryId : categoryInputSet) {
                Optional<Category> category = categoryRepository.findById(categoryId);
                if (category.isPresent())
                    product.getCategory().add(category.get());
                else
                    throw new IllegalArgumentException("Category not find with id: " + categoryId);
            }

        // Fill product with items
        Set<ItemInput> itemInputSet = productInput.getItemInputs();
        if (itemInputSet != null && itemInputSet.size() > 0)
            for (ItemInput itemInput : itemInputSet) {
                Item item = ObjectMapperUtils.map(itemInput, Item.class);
                product.getItems().add(item);
            }

        NutritionalValueInput nutritionalValueInput = productInput.getNutritionalValueInput();
        if (nutritionalValueInput != null)
            UpdateReflection.Update(nutritionalValueInput, product.getNutritionalValue());

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(ProductInput productInput, String userId) {
        Optional<Product> product = productRepository.findById(productInput.getId());
        if (product.isEmpty()) {
            throw new NoSuchElementException("Could not update Product with ID " + productInput.getId());
        } else if (!product.get().getUserId().equals(userId)) {
            throw new BadCredentialsException("Wrong userId");
        }

        // Update essential information first
        UpdateReflection.Update(productInput, product.get());

        // Get persisted categories and items
        Set<Long> categoryIdSet = productInput.getCategoryIds();
        Set<ItemInput> itemInputSet = productInput.getItemInputs();

        if (categoryIdSet != null && categoryIdSet.size() > 0) {
            Set<Category> newSet = new HashSet<>();
            for (var categoryId : categoryIdSet) {
                Optional<Category> newCategory = categoryRepository.findById(categoryId);
                if (newCategory.isPresent())
                    newSet.add(newCategory.get());
                else
                    throw new IllegalArgumentException("Category not found with ID: " + categoryId);
            }
            product.get().setCategory(newSet);
        }

        if (itemInputSet != null && itemInputSet.size() > 0) {
            Set<Item> existingItemSet = product.get().getItems();
            existingItemSet.clear();
            for (var itemInput : itemInputSet) {
                if (itemInput.getId() != null) {
                    Optional<Item> existingItem = itemRepository.findById(itemInput.getId());
                    if (existingItem.isPresent()) {
                        UpdateReflection.Update(itemInput, existingItem.get());
                        existingItemSet.add(existingItem.get());
                    } else
                        throw new IllegalArgumentException("Item not found with ID: " + itemInput.getId());
                } else {
                    Item newItem = ObjectMapperUtils.map(itemInput, Item.class);
                    existingItemSet.add(newItem);
                }
            }
        } else
            product.get().getItems().clear();

        // update nutritional value first and set to null object
        // avoid overriding existing nutritional values
        UpdateReflection.Update(productInput.getNutritionalValueInput(), product.get().getNutritionalValue());

        return productRepository.save(product.get());
    }

    @Override
    public void deleteProduct(Long id, String userId) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent() && product.get().getUserId().equals(userId)) {
            productRepository.deleteById(id);
        } else {
            throw new BadCredentialsException("Wrong userId");
        }
    }
}
