package com.worldbuilder.v1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class WorldbuilderApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorldbuilderApplication.class, args);
	}

}
