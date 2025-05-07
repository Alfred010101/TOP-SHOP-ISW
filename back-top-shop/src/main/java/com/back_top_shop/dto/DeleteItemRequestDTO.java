package com.back_top_shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteItemRequestDTO {
    private String email;
    private Integer fkTshirt;
}
