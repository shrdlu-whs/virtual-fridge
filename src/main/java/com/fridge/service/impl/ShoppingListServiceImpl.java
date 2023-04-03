package com.fridge.service.impl;

import com.fridge.graphql.error.BadCredentialsException;
import com.fridge.graphql.error.IllegalArgumentException;
import com.fridge.graphql.error.NoSuchElementException;
import com.fridge.graphql.inputs.ShoppingListInput;
import com.fridge.graphql.inputs.ShoppingListItemInput;
import com.fridge.model.ShoppingList;
import com.fridge.model.ShoppingListItem;
import com.fridge.repository.ProductRepository;
import com.fridge.repository.ShoppingListItemRepository;
import com.fridge.repository.ShoppingListRepository;
import com.fridge.service.ShoppingListService;
import com.fridge.util.ObjectMapperUtils;
import com.fridge.util.UpdateReflection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ShoppingListServiceImpl implements ShoppingListService {
    private final ShoppingListRepository shoppingListRepository;
    private final ShoppingListItemRepository shoppingListItemRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ShoppingListServiceImpl(ShoppingListRepository shoppingListRepository, ShoppingListItemRepository shoppingListItemRepository, ProductRepository productRepository) {
        this.shoppingListRepository = shoppingListRepository;
        this.shoppingListItemRepository = shoppingListItemRepository;
        this.productRepository = productRepository;
    }

    @Override
    public ShoppingList getShoppingList(Long id, String userId) {
        Optional<ShoppingList> shoppingList = shoppingListRepository.getByIdAndUserId(id, userId);
        if (shoppingList.isEmpty()) {
            throw new NoSuchElementException("Could not find ShoppingList with ID " + id);
        }
        return shoppingList.get();
    }

    @Override
    public List<ShoppingList> fetchShoppingLists(String userId) {
        return shoppingListRepository.getAllByUserId(userId);
    }

    @Override
    public ShoppingList saveShoppingList(ShoppingListInput shoppingListInput) {
        Set<ShoppingListItemInput> shoppingListItemSet = shoppingListInput.getShoppingListItemInputs();
        ShoppingList shoppingList = ObjectMapperUtils.map(shoppingListInput, ShoppingList.class);
        if (shoppingListItemSet != null && shoppingListItemSet.size() > 0)
            for (var item : shoppingListItemSet) {
                ShoppingListItem shoppingListItem = ObjectMapperUtils.map(item, ShoppingListItem.class);
                shoppingListItem.setProduct(productRepository.findById(item.getProductId()).get());
                shoppingList.getShoppingListItems().add(shoppingListItem);
            }

        return shoppingListRepository.save(shoppingList);
    }

    @Override
    public ShoppingList updateShoppingList(ShoppingListInput shoppingListInput, String userId) {
        Optional<ShoppingList> exisitingShoppingList = shoppingListRepository.findById(shoppingListInput.getId());

        // Authentication and sanity check
        if (exisitingShoppingList.isEmpty())
            throw new NoSuchElementException("Could not update ShoppingList with ID " + shoppingListInput.getId());
        else if (!exisitingShoppingList.get().getUserId().equals(userId))
            throw new BadCredentialsException("Wrong userId");

        // Update initial members for existing shopping list
        UpdateReflection.Update(shoppingListInput, exisitingShoppingList.get());

        // Get persisted shopping list items
        Set<ShoppingListItemInput> shoppingListItemInputSet = shoppingListInput.getShoppingListItemInputs();

        if (shoppingListItemInputSet != null && shoppingListItemInputSet.size() > 0) {
            Set<ShoppingListItem> existingSet = exisitingShoppingList.get().getShoppingListItems();
            existingSet.clear();
            for (var shoppingListItemInput : shoppingListInput.getShoppingListItemInputs()) {
                if (shoppingListItemInput.getId() != null) {
                    Optional<ShoppingListItem> existingShoppingListItem = shoppingListItemRepository.findById(shoppingListItemInput.getId());
                    // Item exists in persisted storage
                    if (existingShoppingListItem.isPresent()) {
                        UpdateReflection.Update(shoppingListItemInput, existingShoppingListItem.get());
                        existingSet.add(existingShoppingListItem.get());
                    } else
                        throw new IllegalArgumentException("Wrong id for shopping list item: " + shoppingListItemInput.getId());
                } else {
                    // new item: save in persisted storage before adding it to shopping list
                    ShoppingListItem newShoppingListItem = ObjectMapperUtils.map(shoppingListItemInput, ShoppingListItem.class);
                    if (shoppingListItemInput.getProductId() != null) {
                        newShoppingListItem.setProduct(productRepository.findById(shoppingListItemInput.getProductId()).get());
                        existingSet.add(newShoppingListItem);
                    } else
                        throw new IllegalArgumentException("Product not found with ID: " + shoppingListItemInput.getProductId());
                }
            }
        } else
            exisitingShoppingList.get().getShoppingListItems().clear();

        return shoppingListRepository.save(exisitingShoppingList.get());
    }

    @Override
    public void deleteShoppingList(Long id, String userId) {
        Optional<ShoppingList> shoppingList = shoppingListRepository.findById(id);
        if (shoppingList.isPresent() && shoppingList.get().getUserId().equals(userId)) {
            shoppingListRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Shopping list not found with ID: " + id);
        }
    }
}
