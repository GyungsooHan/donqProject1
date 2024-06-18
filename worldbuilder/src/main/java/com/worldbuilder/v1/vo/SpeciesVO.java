package com.worldbuilder.v1.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="SpeciesVO")
public class SpeciesVO {
	private long species_id;
	private int avg_body_mass;
	private int avg_brain_capacity;
	private String species_name;
	private long world_id;
	
	
	public long getWorld_id() {
		return world_id;
	}
	public void setWorld_id(long world_id) {
		this.world_id = world_id;
	}
	public long getSpecies_id() {
		return species_id;
	}
	public void setSpecies_id(long species_id) {
		this.species_id = species_id;
	}
	public int getAvg_body_mass() {
		return avg_body_mass;
	}
	public void setAvg_body_mass(int avg_body_mass) {
		this.avg_body_mass = avg_body_mass;
	}
	public int getAvg_brain_capacity() {
		return avg_brain_capacity;
	}
	public void setAvg_brain_capacity(int avg_brain_capacity) {
		this.avg_brain_capacity = avg_brain_capacity;
	}
	public String getSpecies_name() {
		return species_name;
	}
	public void setSpecies_name(String species_name) {
		this.species_name = species_name;
	}
}
