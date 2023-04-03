//package com.fridge.controller;
//
//import com.fridge.JsonUtil;
//import com.fridge.model.Recipe;
//import com.fridge.service.RecipeService;
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
//@WebMvcTest(RecipeController.class)
//public class RecipeControllerTest {
//
//
//    @Autowired
//    private MockMvc mvc;
//
//    @MockBean
//    private RecipeService service;
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void givenRecipe_returnJson_return200() throws Exception {
//
//        Recipe recipe = new Recipe();
//        recipe.setName("Tomatensalat");
//        recipe.setExceptedTime((long) 10);
//        recipe.setFavorite(false);
//        recipe.setInstructions("test instruction");
//        recipe.setShortDescription("test description");
//
//        List<Recipe> allRecipes = Arrays.asList(recipe);
//
//        given(service.fetchRecipes("test")).willReturn(allRecipes);
//
//        mvc.perform(get("/api/recipes")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(1)))
//                .andExpect(jsonPath("$[0].name", is(recipe.getName())));
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void givenRecipe_withId_returnJson_return200() throws Exception {
//
//        Recipe recipe = new Recipe();
//        recipe.setName("Tomatensalat");
//        recipe.setExceptedTime((long) 10);
//        recipe.setFavorite(false);
//        recipe.setInstructions("test instruction");
//        recipe.setShortDescription("test description");
//
//        service.saveRecipe(recipe);
//
//        given(service.getRecipe((long) 10, "test")).willReturn(recipe);
//
//        mvc.perform(get("/api/recipes/10")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name", is(recipe.getName())));
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void whenPostRecipe_thenCreateRecipe_thenReturn201() throws Exception {
//        Recipe recipe = new Recipe();
//        recipe.setName("Tomatensalat");
//        recipe.setExceptedTime((long) 10);
//        recipe.setFavorite(false);
//        recipe.setInstructions("test instruction");
//        recipe.setShortDescription("test description");
//
//        given(service.saveRecipe(Mockito.any())).willReturn(recipe);
//
//        mvc.perform(post("/api/recipes").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(recipe))).andExpect(status().isCreated()).andExpect(jsonPath("$.name", is("Tomatensalat")));
//        verify(service, VerificationModeFactory.times(1)).saveRecipe(Mockito.any());
//        reset(service);
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void deleteRecipe_return200() throws Exception
//    {
//        mvc.perform( MockMvcRequestBuilders.delete("/api/recipes/{id}", 1).with(csrf()))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void givenRecipe_returnJson_return401() throws Exception {
//
//        Recipe recipe = new Recipe();
//        recipe.setName("Tomatensalat");
//        recipe.setExceptedTime((long) 10);
//        recipe.setFavorite(false);
//        recipe.setInstructions("test instruction");
//        recipe.setShortDescription("test description");
//
//        List<Recipe> allRecipes = Arrays.asList(recipe);
//
//        given(service.fetchRecipes("test")).willReturn(allRecipes);
//
//        mvc.perform(get("/api/recipes"))
//                .andExpect(status().isUnauthorized());
//
//
//    }
//
//    @Test
//    public void givenRecipe_withId_returnJson_return401() throws Exception {
//
//        mvc.perform(get("/api/recipes/10"))
//                .andExpect(status().isUnauthorized());
//
//    }
//
//    @Test
//    public void whenPostRecipe_thenCreateRecipe_thenReturn401() throws Exception {
//
//        mvc.perform(post("/api/recipes").with(csrf())).andExpect(status().isUnauthorized());
//    }
//
//    @Test
//    public void deleteRecipe_return401() throws Exception
//    {
//        mvc.perform( MockMvcRequestBuilders.delete("/api/recipes/{id}", 1).with(csrf()))
//                .andExpect(status().isUnauthorized());
//    }
//
//    @Test
//    public void putRecipe_return401() throws Exception {
//
//        mvc.perform( MockMvcRequestBuilders.put("/api/recipes").with(csrf()))
//                .andExpect(status().isUnauthorized());
//
//    }
//
//}
