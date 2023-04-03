package com.fridge.repositories;

import com.fridge.model.Item;
import com.fridge.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
public class ItemRepositoryTest {

    private Item item1;
    private Item item2;

    @Autowired
    ItemRepository itemRepository;

    @BeforeEach
    public void init(){
        item1 = new Item();
        item2 = new Item();
        item1.setBarcode("1234567890");
        item1.setExpirationDate(LocalDateTime.now());
        item2.setBarcode("6546435245");
        item2.setExpirationDate(LocalDateTime.now());
    }

    @Test
    public void saveItem(){

        Item savedItem = itemRepository.save(item1);

        assertThat(savedItem.getBarcode()).isEqualTo("1234567890");
        assertThat(savedItem.getId()).isNotNull();
        assertThat(savedItem.getExpirationDate()).isNotNull();
        assertThat(savedItem.getCreated()).isNotNull();

    }

    @Test
    public void fetchItem(){

        itemRepository.save(item1);
        itemRepository.save(item2);

        List<Item> found = itemRepository.findAll();

        assertThat(found.isEmpty()).isFalse();

        Optional<Item> foundById = itemRepository.findById(item2.getId());

        assertThat(foundById).isNotNull();

    }

    @Test
    public void deleteItem(){

        itemRepository.save(item1);

        itemRepository.delete(item1);

        Optional<Item> found = itemRepository.findById(item1.getId());

        assertThat(found).isEmpty();

    }

}
