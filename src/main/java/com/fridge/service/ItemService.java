package com.fridge.service;

import com.fridge.model.Item;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    Item getItem(Long id);
    List<Item> fetchItems();
    Item saveItem(Item item);
    Item updateItem(Item item);
    void deleteItem(Long id);
}
