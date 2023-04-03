package com.fridge.graphql.mutationresolver;

import com.fridge.graphql.inputs.ProductInput;
import com.fridge.model.Product;
import com.fridge.service.ProductService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class ProductMutationResolver implements GraphQLMutationResolver {

    private final ProductService productService;

    @Autowired
    public ProductMutationResolver(ProductService productService) {
        this.productService = productService;
    }

    public Product createProduct(ProductInput input) {
        String userId = getContext().getAuthentication().getName();
        input.setUserId(userId);

        return productService.saveProduct(input);
    }

    public Product updateProduct(ProductInput input) {
        String userId = getContext().getAuthentication().getName();
        input.setUserId(userId);

        return productService.updateProduct(input, input.getUserId());
    }

    public Long deleteProduct(Long id) {
        String userId = getContext().getAuthentication().getName();
        productService.deleteProduct(id, userId);
        return id;
    }

    // graphiql functions - delete after test -------------------------------------
    public Product createProductI(ProductInput input, String userId) {
        input.setUserId(userId);

        return productService.saveProduct(input);
    }

    public Product updateProductI(ProductInput input, String userId) {
        input.setUserId(userId);

        return productService.updateProduct(input, input.getUserId());
    }

    public Long deleteProductI(Long id, String userId) {
        productService.deleteProduct(id, userId);
        return id;
    }
}
