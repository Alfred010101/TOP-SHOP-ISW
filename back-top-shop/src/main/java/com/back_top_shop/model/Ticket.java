package com.back_top_shop.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fk_user")
    private Integer fkUser;

    @Column(name = "cart_name")
    private String cartName;

    @Column(name = "cart_number")
    private String cartNumber;

    @Column(name = "date", insertable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    @Column(name = "status", insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private Status  status;

    public enum Status 
    {
        PENDIENTE,
        ENVIADO,
        ENTREGADO,
    }
}
