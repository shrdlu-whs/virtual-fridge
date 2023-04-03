package com.fridge.graphql.queryresolver;

import com.fridge.model.Product;
import com.fridge.service.ProductService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class ProductResolver implements GraphQLQueryResolver {

    private final ProductService productService;

    @Autowired
    public ProductResolver(ProductService productService) {
        this.productService = productService;
    }

    //    @PreAuthorize("authentication.name != ''")
    public Product getProduct(Long id) {
        String userId = getContext().getAuthentication().getName();
        return productService.getProduct(id, userId);
    }

    public Set<Product> getProducts() {
        String userId = getContext().getAuthentication().getName();
        Set<Product> products = productService.fetchProducts(userId);
        return products;
    }

    // graphiql queries -----------------------------------------------------------
    public Set<Product> getProductsI(String userId) {
        Set<Product> products = productService.fetchProducts(userId);
        return products;
    }

    public Product getProductI(String userId, Long id) {
        return productService.getProduct(id, userId);
    }
}
