//package com.fridge.controller;
//
//import com.fridge.JsonUtil;
//import com.fridge.model.NutritionalValue;
//import com.fridge.model.Product;
//import com.fridge.service.impl.ProductServiceImpl;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.mockito.internal.verification.VerificationModeFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.hamcrest.CoreMatchers.is;
//import static org.hamcrest.Matchers.hasSize;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.reset;
//import static org.mockito.Mockito.verify;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@TestPropertySource(locations = {"classpath:application-test.properties"})
//@ActiveProfiles("test")
//@RunWith(SpringRunner.class)
//@WebMvcTest(ProductController.class)
//public class ProductControllerTest {
//
//    @Autowired
//    private MockMvc mvc;
//
//    @MockBean
//    private ProductServiceImpl service;
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void givenProduct_returnJson_return200() throws Exception {
//
//        Product product = new Product();
//        product.setName("Tomate");
//
//        List<Product> allProducts = Arrays.asList(product);
//
//        given(service.fetchProducts("test")).willReturn(allProducts);
//
//        mvc.perform(get("/api/products")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(1)))
//                .andExpect(jsonPath("$[0].name", is(product.getName())));
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void givenProduct_withId_returnJson_return200() throws Exception {
//
//        Product product = new Product();
//        product.setName("Tomate");
//        product.setId((long) 10);
//
//        var nutritionalValue = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);
//        product.setNutritionalValue(nutritionalValue);
//
//        service.saveProduct(product);
//
//        given(service.getProduct((long) 10, "test")).willReturn(product);
//
//        mvc.perform(get("/api/products/" + product.getId())
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name", is(product.getName())));
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void whenPostProduct_thenCreateProduct_thenReturn201() throws Exception {
//
//        Product product = new Product();
//        product.setName("Tomate");
//        given(service.saveProduct(Mockito.any())).willReturn(product);
//
//        mvc.perform(post("/api/products").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(product)))
//                .andExpect(status().isCreated()).andExpect(jsonPath("$.name", is("Tomate")));
//        verify(service, VerificationModeFactory.times(1)).saveProduct(Mockito.any());
//        reset(service);
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void deleteProduct_return200() throws Exception
//    {
//        mvc.perform( MockMvcRequestBuilders.delete("/api/products/{id}", 1).with(csrf()))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void givenProduct_withId_returnJson_return401() throws Exception {
//
//        Product product = new Product();
//        product.setName("Tomate");
//        product.setId((long) 10);
//
//        var nutritionalValue = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);
//        product.setNutritionalValue(nutritionalValue);
//
//        service.saveProduct(product);
//
//        given(service.getProduct((long) 10, "10")).willReturn(product);
//
//        mvc.perform(get("/api/products/" + product.getId())).andExpect(status().isUnauthorized());
//
//    }
//
//    @Test
//    public void whenPostProduct_thenCreateProduct_thenReturn401() throws Exception {
//
//        mvc.perform(post("/api/products").with(csrf())).andExpect(status().isUnauthorized());
//
//    }
//
//    @Test
//    public void deleteProduct_return401() throws Exception
//    {
//        mvc.perform( MockMvcRequestBuilders.delete("/api/products/{id}", 1).with(csrf()))
//                .andExpect(status().isUnauthorized());
//    }
//
//    @Test
//    public void givenProduct_returnJson_return401() throws Exception {
//
//        Product product = new Product();
//        product.setName("Tomate");
//
//        List<Product> allProducts = Arrays.asList(product);
//
//        given(service.fetchProducts("10")).willReturn(allProducts);
//
//        mvc.perform(get("/api/products")).andExpect(status().isUnauthorized());
//
//    }
//
//    @Test
//    public void putProduct_return401() throws Exception {
//
//        mvc.perform( MockMvcRequestBuilders.put("/api/products").with(csrf()))
//                .andExpect(status().isUnauthorized());
//
//    }
//
//}
