package com.fridge.graphql.inputs;
import java.time.LocalDateTime;

public class ItemInput {

    private Long id;
    private String barcode;
    private LocalDateTime expirationDate;

    public ItemInput() {
    }

    public ItemInput(Long id, String barcode, LocalDateTime expirationDate) {
        this.id = id;
        this.barcode = barcode;
        this.expirationDate = expirationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }
}
