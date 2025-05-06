package com.back_top_shop.dto;

public interface ShoppingCartItemDTO 
{
    int getId();
    int getFkTshirt();
    int getAmount();
    String getTitle();
    String getResource();
    String getDescription();
    Double getPrice();
}
