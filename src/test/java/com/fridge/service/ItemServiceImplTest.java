package com.fridge.service;

import com.fridge.model.Item;
import com.fridge.repository.ItemRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
public class ItemServiceImplTest {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemRepository itemRepository;

    Item item1;
    Item item2;

    @Before
    public void init(){

        item1 = new Item();
        item1.setId((long) 10);
        item1.setExpirationDate(LocalDateTime.now());

        item2 = new Item();
        item2.setId((long) 5);
        item2.setExpirationDate(LocalDateTime.now());

    }

    @Test
    public void itemShouldBeSaved(){

        Item savedItem = itemService.saveItem(item1);
        assertThat(savedItem.getExpirationDate()).isEqualTo(item1.getExpirationDate());
        assertThat(savedItem.getId()).isNotNull();

    }

    @Test
    public void itemShouldbeFetched(){

        itemService.saveItem(item1);
        List<Item> accountList = itemService.fetchItems();
        assertThat(accountList).isNotEmpty();

    }

    @Test
    public void itemShouldBeUpdated(){

        Item updatable = itemService.saveItem(item1);

        updatable.setBarcode("testCode");

        Item updatedItem = itemService.updateItem(updatable);

        Optional<Item> found = itemRepository.findById((updatedItem.getId()));

        assertThat(updatable.getId()).isEqualTo(found.get().getId());
        assertThat(updatedItem.getBarcode()).isEqualTo("testCode");
        assertThat(found.get().getExpirationDate().truncatedTo(ChronoUnit.SECONDS)).isEqualTo(updatable.getExpirationDate().truncatedTo(ChronoUnit.SECONDS));

    }

    @Test
    public void itemShouldBeDeleted(){

        Item deletable = itemService.saveItem(item1);
        itemService.deleteItem(deletable.getId());
        Optional<Item> found = itemRepository.findById(item1.getId());
        assertThat(found).isEmpty();

    }

    @Test
    public void oneItemShouldBeFetched(){

        Item fetchable = itemService.saveItem(item1);
        itemService.getItem(fetchable.getId());
        Optional<Item> found = itemRepository.findById(fetchable.getId());
        assertThat(found).isNotEmpty();
        assertThat(found.get().getId()).isNotNull();
        assertThat(found.get().getExpirationDate()).isNotNull();

    }

}
