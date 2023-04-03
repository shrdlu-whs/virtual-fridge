//package com.fridge.controller;
//
//import com.fridge.JsonUtil;
//import com.fridge.model.ShoppingList;
//import com.fridge.service.ShoppingListService;
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
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//
//@TestPropertySource(locations = {"classpath:application-test.properties"})
//@ActiveProfiles("test")
//@RunWith(SpringRunner.class)
//@WebMvcTest(ShoppingListController.class)
//public class ShoppingListControllerTest {
//
//    @Autowired
//    private MockMvc mvc;
//
//    @MockBean
//    private ShoppingListService service;
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void givenShoppingList_returnJson_return200() throws Exception {
//
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setName("Testliste");
//
//        List<ShoppingList> allShopLists = Arrays.asList(shoppingList);
//
//        given(service.fetchShoppingLists("test")).willReturn(allShopLists);
//
//        mvc.perform(get("/api/shoppingLists")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(1)))
//                .andExpect(jsonPath("$[0].name", is(shoppingList.getName())));
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void givenShoppingList_withId_returnJson_return200() throws Exception {
//
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setName("Testliste");
//        shoppingList.setId((long) 10);
//
//        service.saveShoppingList(shoppingList);
//
//        given(service.getShoppingList((long) 10, "test")).willReturn(shoppingList);
//
//        mvc.perform(get("/api/shoppingLists/10")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name", is(shoppingList.getName())));
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void whenPostShoppingList_thenCreateShoppingList_thenReturn201() throws Exception {
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setName("Testliste");
//
//        given(service.saveShoppingList(Mockito.any())).willReturn(shoppingList);
//
//        mvc.perform(post("/api/shoppingLists").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(shoppingList))).andExpect(status().isCreated()).andExpect(jsonPath("$.name", is("Testliste")));
//        verify(service, VerificationModeFactory.times(1)).saveShoppingList(Mockito.any());
//        reset(service);
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void deleteShoppingList_return200() throws Exception
//    {
//        mvc.perform( MockMvcRequestBuilders.delete("/api/shoppingLists/{id}", 1).with(csrf()))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void givenShoppingList_returnJson_return401() throws Exception {
//
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setName("Testliste");
//
//        List<ShoppingList> allShopLists = Arrays.asList(shoppingList);
//
//        given(service.fetchShoppingLists("test")).willReturn(allShopLists);
//
//        mvc.perform(get("/api/shoppingLists"))
//                .andExpect(status().isUnauthorized());
//
//
//    }
//
//    @Test
//    public void givenShoppingList_withId_returnJson_return401() throws Exception {
//
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setName("Testliste");
//        shoppingList.setId((long) 10);
//
//        service.saveShoppingList(shoppingList);
//
//        given(service.getShoppingList((long) 10, "10")).willReturn(shoppingList);
//
//        mvc.perform(get("/api/shoppingLists/10"))
//                .andExpect(status().isUnauthorized());
//
//
//    }
//
//    @Test
//    public void whenPostShoppingList_thenCreateShoppingList_thenReturn401() throws Exception {
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setName("Testliste");
//
//        given(service.saveShoppingList(Mockito.any())).willReturn(shoppingList);
//
//        mvc.perform(post("/api/shoppingLists").with(csrf())).andExpect(status().isUnauthorized());
//
//    }
//
//    @Test
//    public void deleteShoppingList_return401() throws Exception
//    {
//        mvc.perform( MockMvcRequestBuilders.delete("/api/shoppingLists/{id}", 1).with(csrf()))
//                .andExpect(status().isUnauthorized());
//    }
//
//    @Test
//    public void putShoppingList_return401() throws Exception {
//
//        mvc.perform( MockMvcRequestBuilders.put("/api/shoppingLists/").with(csrf()))
//                .andExpect(status().isUnauthorized());
//
//    }
//
//}
