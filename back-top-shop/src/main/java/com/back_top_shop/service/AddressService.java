package com.back_top_shop.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.back_top_shop.dto.AddressDTO;
import com.back_top_shop.model.Address;
import com.back_top_shop.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService 
{
    private final AddressRepository addressRepository;

    public Optional<Address> findById(Integer id)
    {
        return addressRepository.findById(id);
    }

    public ResponseEntity<Address> save(Address addres)
    {
        System.out.println("AAAAAAAqqqqqqqqqqqquuuuuuiii 33333");
        return ResponseEntity.ok(addressRepository.save(addres));
    }

    public ResponseEntity<?> update(Address address, AddressDTO body)
    {
        //Address address = addressRepository.findById(id).get();

        address.setStreetName(body.streetName());
        address.setExteriorNumber(body.exteriorNumber());
        address.setInteriorNumber(body.interiorNumber());
        address.setPostalCode(body.postalCode());
        address.setReferences(body.references());

        return ResponseEntity.ok(addressRepository.save(address));
    }
}
