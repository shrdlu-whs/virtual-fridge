package com.fridge.service.impl;

import com.fridge.model.Item;
import com.fridge.repository.ItemRepository;
import com.fridge.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item getItem(Long id) {
        Optional<Item> item = itemRepository.findById(id);
        if(item.isEmpty()) {
            throw new NoSuchElementException("Could not find Item with ID " + id);
        }
        return item.get();
    }

    @Override
    public List<Item> fetchItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }


    @Override
    public Item updateItem(Item item) {
        if(itemRepository.findById(item.getId()).isEmpty()) {
            throw new NoSuchElementException("Could not update Item with ID " + item.getId());
        }
        return itemRepository.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
