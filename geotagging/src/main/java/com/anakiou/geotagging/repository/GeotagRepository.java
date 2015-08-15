package com.anakiou.geotagging.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.anakiou.geotagging.domain.Geotag;

@RepositoryRestResource(collectionResourceRel = "tags", path = "tags")
public interface GeotagRepository extends MongoRepository<Geotag, String> {

	List<Geotag> findByName(@Param("name") String name);

}