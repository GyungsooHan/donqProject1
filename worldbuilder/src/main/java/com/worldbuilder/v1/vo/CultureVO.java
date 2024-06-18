package com.worldbuilder.v1.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="CultureVO")
public class CultureVO {
	private long culture_id;
	private String culture_name;
	private String culture_description;
	private int military_focus;
	private int diplomacy_focus;
	private int industry_focus;
	private int knowledge_focus;
	private long world_id;
	
	public long getCulture_id() {
		return culture_id;
	}
	public void setCulture_id(long culture_id) {
		this.culture_id = culture_id;
	}
	public String getCulture_name() {
		return culture_name;
	}
	public void setCulture_name(String culture_name) {
		this.culture_name = culture_name;
	}
	public String getCulture_description() {
		return culture_description;
	}
	public void setCulture_description(String culture_description) {
		this.culture_description = culture_description;
	}
	public int getMilitary_focus() {
		return military_focus;
	}
	public void setMilitary_focus(int military_focus) {
		this.military_focus = military_focus;
	}
	public int getDiplomacy_focus() {
		return diplomacy_focus;
	}
	public void setDiplomacy_focus(int diplomacy_focus) {
		this.diplomacy_focus = diplomacy_focus;
	}
	public int getIndustry_focus() {
		return industry_focus;
	}
	public void setIndustry_focus(int industry_focus) {
		this.industry_focus = industry_focus;
	}
	public int getKnowledge_focus() {
		return knowledge_focus;
	}
	public void setKnowledge_focus(int knowledge_focus) {
		this.knowledge_focus = knowledge_focus;
	}
	public long getWorld_id() {
		return world_id;
	}
	public void setWorld_id(long world_id) {
		this.world_id = world_id;
	}
}
