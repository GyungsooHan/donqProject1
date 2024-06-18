package com.worldbuilder.v1.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.worldbuilder.v1.vo.BalanceGroupVO;
import com.worldbuilder.v1.vo.CampaignVO;
import com.worldbuilder.v1.vo.CounterVO;
import com.worldbuilder.v1.vo.GroupUnitVO;

@Mapper
public interface BalanceGroupMapper {
	 public List<BalanceGroupVO> getAllBalanceGroup();
	 public void insertBalanceGroup(BalanceGroupVO balanceGroupVO);
	 public void deleteBalanceGroup(BalanceGroupVO balanceGroupVO);
	 public List<CampaignVO> getAllCampaign();
	 public void insertCampaign(CampaignVO campaignVO);
	 public void deleteCampaign(CampaignVO campaignVO);
	 public void updateCampaign(CampaignVO campaignVO);
	 public CounterVO searchExistingCounter(CounterVO counterVO);
	 public List<GroupUnitVO> getAllGroupUnitByGroupId(int group_id);
	 public List<CounterVO> getCounterVObyUnit(int attacker_id);
	 public void insertGroupUnit(GroupUnitVO groupUnitVO);
	 
	 public void updateCounter(CounterVO counterVO);
	 public void insertCounter(CounterVO counterVO);
	 

	 public void updateGroupUnit(GroupUnitVO groupUnitVO);
	 public void deleteGroupUnit(GroupUnitVO groupUnitVO);
	 public BalanceGroupVO verifyAuthor(BalanceGroupVO balanceGroupVO);
}
