package com.worldbuilder.v1.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="CounterVO")
public class CounterVO {
	private int id;
    private int attacker_id;
    private int defender_id;
    private int damage_value;
    private String defender_name;
    
    
    
	public String getDefender_name() {
		return defender_name;
	}
	public void setDefender_name(String defender_name) {
		this.defender_name = defender_name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public int getAttacker_id() {
		return attacker_id;
	}
	public void setAttacker_id(int attacker_id) {
		this.attacker_id = attacker_id;
	}
	public int getDefender_id() {
		return defender_id;
	}
	public void setDefender_id(int defender_id) {
		this.defender_id = defender_id;
	}
	public int getDamage_value() {
		return damage_value;
	}
	public void setDamage_value(int damage_value) {
		this.damage_value = damage_value;
	}
	
	
	
	
	
	
	
}
