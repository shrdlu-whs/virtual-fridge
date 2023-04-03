package com.fridge.controller;

import com.fridge.dto.ProductDto;
import com.fridge.model.Product;
import com.fridge.service.ProductService;
import com.fridge.util.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
        //Test Kommentar für CI/CD
    }

    @GetMapping("/products/{id}")
//    @Bulkhead(name="productBulkhead")
    public ResponseEntity<ProductDto> getProduct(@PathVariable("id") Long id, Principal principal) {
        Product product = productService.getProduct(id, principal.getName());
        ProductDto responseProductDto = ObjectMapperUtils.map(product, ProductDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(responseProductDto);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getProducts(Principal principal) {
        Set<Product> productEntities = productService.fetchProducts(principal.getName());
        List<ProductDto> productDtos = ObjectMapperUtils.mapAll(productEntities, ProductDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(productDtos);
    }

//    @PostMapping("/products")
//    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto, Principal principal) {
//        Product product = ObjectMapperUtils.map(productDto, Product.class);
//        product.setUserId(principal.getName());
//        Product returnedProduct = productService.saveProduct(product);
//        ProductDto responseProductDTO = ObjectMapperUtils.map(returnedProduct, ProductDto.class);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseProductDTO);
//    }

//    @PutMapping("/products")
//    public ResponseEntity<ProductDto> putProduct(@RequestBody ProductDto productDto, Principal principal) {
//        Product product = ObjectMapperUtils.map(productDto, Product.class);
//        Product returnedProduct = productService.updateProduct(product, principal.getName());
//        ProductDto responseProductDto = ObjectMapperUtils.map(returnedProduct, ProductDto.class);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseProductDto);
//    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id, Principal principal) {
        productService.deleteProduct(id, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
