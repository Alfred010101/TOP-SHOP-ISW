package com.back_top_shop.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tshirts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TShirt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String resource;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Talla talla;

    private Double price;

    private Integer existence;

    private String description;

    public enum Category {
        FRASES_Y_CITAS,
        DISENOS_ARTISTICOS,
        CULTURA_POP,
        TEMPORADAS,
        DISENOS_GEEK_Y_NERD
    }

    public enum Type {
        HOMBRE, MUJER, NINO, NINA
    }

    public enum Talla {
        XS, S, M, L, XL, XXL
    }
}
