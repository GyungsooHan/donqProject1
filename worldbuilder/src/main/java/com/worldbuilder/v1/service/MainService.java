package com.worldbuilder.v1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.worldbuilder.v1.mapper.BalanceGroupMapper;

import com.worldbuilder.v1.vo.BalanceGroupVO;
import com.worldbuilder.v1.vo.CampaignVO;
import com.worldbuilder.v1.vo.CounterVO;
import com.worldbuilder.v1.vo.GroupUnitVO;

@Service
public class MainService {
	@Autowired
    private PasswordEncoder pwEncoder;
	@Autowired
    private BalanceGroupMapper balanceGroupMapper;


	 public List<BalanceGroupVO> getAllBalanceGroup() {
	        return this.balanceGroupMapper.getAllBalanceGroup();
	    }
	 
	 public String insertBalanceGroup(BalanceGroupVO balanceGroupVO) {
		 balanceGroupMapper.insertBalanceGroup(balanceGroupVO);
		 return "success";
	 }	 
	 public String deleteBalanceGroup(BalanceGroupVO balanceGroupVO) {
		 balanceGroupMapper.deleteBalanceGroup(balanceGroupVO);
		 return "success";
	 }	 
	 
	 public List<CampaignVO> getAllCampaign() {
	        return this.balanceGroupMapper.getAllCampaign();
	    }
	 
	 public String insertCampaign(CampaignVO campaignVO) {
		 balanceGroupMapper.insertCampaign(campaignVO);
		 return "success";
	 }	 
	 public String deleteCampaign(CampaignVO campaignVO) {
		 balanceGroupMapper.deleteCampaign(campaignVO);
		 return "success";
	 }	 
	 public String updateCampaign(CampaignVO campaignVO) {
		 balanceGroupMapper.updateCampaign(campaignVO);
		 return "success";
	 }	 
	 
	 
	 public CounterVO searchExistingCounter(CounterVO counterVO) {
		 return balanceGroupMapper.searchExistingCounter(counterVO);
	 }	 
	 public List<GroupUnitVO> getAllGroupUnitByGroupId(int group_id) {
	        return this.balanceGroupMapper.getAllGroupUnitByGroupId(group_id);
	    }
	 public List<CounterVO> getCounterVObyUnit(int attacker_id) {
	        return this.balanceGroupMapper.getCounterVObyUnit(attacker_id);
	    }
	 
	 public String insertGroupUnit(GroupUnitVO groupUnitVO) {
		 balanceGroupMapper.insertGroupUnit(groupUnitVO);
		 return "success";
	 }
	 public String updateGroupUnit(GroupUnitVO groupUnitVO) {
		 balanceGroupMapper.updateGroupUnit(groupUnitVO);
		 return "success";
	 }
	 public String deleteGroupUnit(GroupUnitVO groupUnitVO) {
		 balanceGroupMapper.deleteGroupUnit(groupUnitVO);
		 return "success";
	 }
	 
	 public BalanceGroupVO verifyAuthor(BalanceGroupVO balanceGroupVO) {
		 return  balanceGroupMapper.verifyAuthor(balanceGroupVO);
	 }
	 
	 public String updateCounter(CounterVO counterVO) {
		 balanceGroupMapper.updateCounter(counterVO);
		 return "success";
	 }
	 public String insertCounter(CounterVO counterVO) {
		 balanceGroupMapper.insertCounter(counterVO);
		 return "success";
	 }
	 

	 
}
