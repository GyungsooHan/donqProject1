package com.worldbuilder.v1.vo;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository(value="GroupUnitVO")
public class GroupUnitVO {
	private boolean toggle;
	private int id;
	private int group_id;
	private String name;
	private int cost;
	private int dicipline;
	private int attack;
	private int defence;
	private int morale_taken;
	private int str_taken;
	private int mountain;
	private int hill;
	private int marsh;
	private int desert;
	private int desert_hill;
	private int jungle;
	private int forest;
	private int plain;
	private int farmland;
	private int oasis;
	
	
	
	public boolean isToggle() {
		return toggle;
	}
	public void setToggle(boolean toggle) {
		this.toggle = toggle;
	}
	private List<CounterVO> counterList;
	
	//statistic
	private int winMatchCnt;
	private int winStrTradeCnt;
	private int finalMorale;
	private int finalStr;
	private int finalEnemyMorale;
	private int finalEnemyStr;
	
	
	private int costEffectForMorale;
	private int costEffectForStr;
	
	
	public int getWinStrTradeCnt() {
		return winStrTradeCnt;
	}
	public void setWinStrTradeCnt(int winStrTradeCnt) {
		this.winStrTradeCnt = winStrTradeCnt;
	}
	public int getFinalEnemyMorale() {
		return finalEnemyMorale;
	}
	public void setFinalEnemyMorale(int finalEnemyMorale) {
		this.finalEnemyMorale = finalEnemyMorale;
	}
	public int getFinalEnemyStr() {
		return finalEnemyStr;
	}
	public void setFinalEnemyStr(int finalEnemyStr) {
		this.finalEnemyStr = finalEnemyStr;
	}
	public int getCostEffectForMorale() {
		return costEffectForMorale;
	}
	public void setCostEffectForMorale(int costEffectForMorale) {
		this.costEffectForMorale = costEffectForMorale;
	}
	public int getCostEffectForStr() {
		return costEffectForStr;
	}
	public void setCostEffectForStr(int costEffectForStr) {
		this.costEffectForStr = costEffectForStr;
	}
	public int getFinalMorale() {
		return finalMorale;
	}
	public void setFinalMorale(int finalMorale) {
		this.finalMorale = finalMorale;
	}
	public int getFinalStr() {
		return finalStr;
	}
	public void setFinalStr(int finalStr) {
		this.finalStr = finalStr;
	}
	public int getWinMatchCnt() {
		return winMatchCnt;
	}
	public void setWinMatchCnt(int winMatchCnt) {
		this.winMatchCnt = winMatchCnt;
	}
	
	
	public List<CounterVO> getCounterList() {
		return counterList;
	}
	public void setCounterList(List<CounterVO> counterList) {
		this.counterList = counterList;
	}
	public int getMountain() {
		return mountain;
	}
	public void setMountain(int mountain) {
		this.mountain = mountain;
	}
	public int getHill() {
		return hill;
	}
	public void setHill(int hill) {
		this.hill = hill;
	}
	public int getMarsh() {
		return marsh;
	}
	public void setMarsh(int marsh) {
		this.marsh = marsh;
	}
	public int getDesert() {
		return desert;
	}
	public void setDesert(int desert) {
		this.desert = desert;
	}
	public int getDesert_hill() {
		return desert_hill;
	}
	public void setDesert_hill(int desert_hill) {
		this.desert_hill = desert_hill;
	}
	public int getJungle() {
		return jungle;
	}
	public void setJungle(int jungle) {
		this.jungle = jungle;
	}
	public int getForest() {
		return forest;
	}
	public void setForest(int forest) {
		this.forest = forest;
	}
	public int getPlain() {
		return plain;
	}
	public void setPlain(int plain) {
		this.plain = plain;
	}
	public int getFarmland() {
		return farmland;
	}
	public void setFarmland(int farmland) {
		this.farmland = farmland;
	}
	public int getOasis() {
		return oasis;
	}
	public void setOasis(int oasis) {
		this.oasis = oasis;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getGroup_id() {
		return group_id;
	}
	public void setGroup_id(int group_id) {
		this.group_id = group_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCost() {
		return cost;
	}
	public void setCost(int cost) {
		this.cost = cost;
	}
	public int getDicipline() {
		return dicipline;
	}
	public void setDicipline(int dicipline) {
		this.dicipline = dicipline;
	}
	public int getAttack() {
		return attack;
	}
	public void setAttack(int attack) {
		this.attack = attack;
	}
	public int getDefence() {
		return defence;
	}
	public void setDefence(int defence) {
		this.defence = defence;
	}
	public int getMorale_taken() {
		return morale_taken;
	}
	public void setMorale_taken(int morale_taken) {
		this.morale_taken = morale_taken;
	}
	public int getStr_taken() {
		return str_taken;
	}
	public void setStr_taken(int str_taken) {
		this.str_taken = str_taken;
	}	
}
