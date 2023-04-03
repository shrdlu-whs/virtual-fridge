package com.fridge.service;

import com.fridge.graphql.inputs.ProductInput;
import com.fridge.model.Product;

import java.util.Set;

public interface ProductService {
    Product getProduct(Long id, String userId);

    Set<Product> fetchProducts(String userId);

    Product saveProduct(ProductInput productInput);

    Product updateProduct(ProductInput productInput, String userId);

    void deleteProduct(Long id, String userId);
}
