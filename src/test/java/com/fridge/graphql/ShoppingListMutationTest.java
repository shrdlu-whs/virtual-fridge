package com.fridge.graphql;

import com.fridge.graphql.error.UnauthenticatedAccessException;
import com.fridge.graphql.inputs.ShoppingListInput;
import com.fridge.graphql.inputs.ShoppingListItemInput;
import com.fridge.model.ShoppingList;
import com.fridge.model.ShoppingListItem;
import com.fridge.service.ShoppingListService;
import com.fridge.service.impl.ShoppingListServiceImpl;
import com.fridge.util.ObjectMapperUtils;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
//@GraphQLTest
public class ShoppingListMutationTest {


    @Autowired private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    ShoppingListService shoppingListServiceMock;

    @Captor
    ArgumentCaptor<ShoppingListInput> shoppingListInputArgumentCaptor;

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void saveShoppingList_Authorized() throws Exception {
        String userId = "anonymousUser";
        // Define returned shopping list item
        Set<ShoppingListItem> shoppingListItemSet = new HashSet<ShoppingListItem>();
        ShoppingListItem item = new ShoppingListItem();
        item.setId((long)1);
        item.setQuantity(1);
        item.setIsAcquired(false);
        shoppingListItemSet.add(item);

        ShoppingList shoppingList = new ShoppingList();
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        shoppingList.setUserId(userId);
        shoppingList.setId((long) 10);
        shoppingList.setShoppingListItems(shoppingListItemSet);

        shoppingList.setName("Einkaufsliste");
        shoppingLists.add(shoppingList);

        doReturn(shoppingList).when(shoppingListServiceMock).saveShoppingList(any(ShoppingListInput.class));

        GraphQLResponse response = graphQLTestTemplate.postForResource("test/saveShoppingList.graphql");

        verify(shoppingListServiceMock).saveShoppingList(shoppingListInputArgumentCaptor.capture());
        assertEquals("Einkaufsliste", shoppingListInputArgumentCaptor.getValue().getName());assertThat(response.isOk()).isTrue();
        assertEquals(1, shoppingListInputArgumentCaptor.getValue().getShoppingListItemInputs().size());

        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.createShoppingList.name")).isEqualTo("Einkaufsliste");
        assertThat(response.get("$.data.createShoppingList.id")).isEqualTo("10");
    }

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void updateShoppingList_Authorized() throws Exception {
        String userId = "anonymousUser";

        // Define returned shopping list
        // Define returned shopping list item
        Set<ShoppingListItem> shoppingListItemSet = new HashSet<ShoppingListItem>();
        ShoppingListItem item = new ShoppingListItem();
        item.setId((long)1);
        item.setQuantity(1);
        item.setIsAcquired(true);
        shoppingListItemSet.add(item);

        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setUserId(userId);
        shoppingList.setId((long) 10);
        shoppingList.setShoppingListItems(shoppingListItemSet);

        shoppingList.setName("Neue Einkaufsliste");


        doReturn(shoppingList).when(shoppingListServiceMock).updateShoppingList(any(ShoppingListInput.class), any());
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/updateShoppingList.graphql");

        verify(shoppingListServiceMock).updateShoppingList(shoppingListInputArgumentCaptor.capture(), eq(userId));
        assertEquals("Neue Einkaufsliste", shoppingListInputArgumentCaptor.getValue().getName());
        assertEquals(1, shoppingListInputArgumentCaptor.getValue().getShoppingListItemInputs().size());
        assertEquals(shoppingList.getId(), shoppingListInputArgumentCaptor.getValue().getId());

        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.updateShoppingList.name")).isEqualTo(shoppingList.getName());
        assertThat(response.get("$.data.updateShoppingList.id")).isEqualTo(shoppingList.getId().toString());
    }

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void deleteShoppingList_IDFound() throws Exception {
        String userId = "anonymousUser";
        Long shoppingListId = (long)10;

        doNothing().when(shoppingListServiceMock).deleteShoppingList(shoppingListId, userId);
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/deleteShoppingList.graphql");

        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.deleteShoppingList")).isEqualTo(shoppingListId.toString());
    }

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void deleteShoppingList_IDNotFound() throws Exception {
        String userId = "anonymousUser";
        Long shoppingListId = (long)10;

        doThrow(IllegalArgumentException.class).when(shoppingListServiceMock).deleteShoppingList(shoppingListId, userId);
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/deleteShoppingList.graphql");

        assertThat(response.isOk()).isTrue();
        assertThat(response.assertThatErrorsField().isNotNull());
    }
}