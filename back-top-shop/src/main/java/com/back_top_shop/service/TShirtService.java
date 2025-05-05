package com.back_top_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_top_shop.model.TShirt;
import com.back_top_shop.repository.TShirtRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class TShirtService {
    private final TShirtRepository tshirtRepository;

    public TShirt save(TShirt entity)
    {
        return tshirtRepository.save(entity);
    }

    public List<TShirt> findAll() 
    {
        return tshirtRepository.findAll();
    }

    public List<TShirt> findLast() 
    {
        return tshirtRepository.findLast();
    }
}
