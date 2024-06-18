package com.worldbuilder.v1.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Date;
import com.worldbuilder.v1.service.MainService;
import com.worldbuilder.v1.vo.CultureVO;
import com.worldbuilder.v1.vo.GroupUnitVO;
import com.worldbuilder.v1.vo.SpeciesVO;
import com.worldbuilder.v1.vo.BalanceGroupVO;
import com.worldbuilder.v1.vo.CampaignVO;
import com.worldbuilder.v1.vo.CounterVO;

@Controller
@RequestMapping("/")
public class ImperatorRomeBalance {
	 @Autowired
	 	private PasswordEncoder pwEncoder;
	 @Autowired
	    private MainService mainService;
	
	 @GetMapping(value={"save_impoerter"})
	    public ModelAndView campaignData(HttpServletRequest request) {
			 ModelAndView mav = new ModelAndView(); 
		        mav.setViewName("views/imperator/save_impoerter");
		        return mav;
	    }
	 
	 @GetMapping(value={"campaign_manager"})
	    public ModelAndView campaign_manager(HttpServletRequest request) {
			 ModelAndView mav = new ModelAndView(); 
		        mav.setViewName("views/imperator/campaign_manager");
		        return mav;
	    }
	 
	@GetMapping(value={""})
    public ModelAndView balanceGroup(HttpServletRequest request) {
		 ModelAndView mav = new ModelAndView(); 
	        List<BalanceGroupVO> balanceGroupList = mainService.getAllBalanceGroup();
	        mav.addObject("balanceGroupList", balanceGroupList);
	        mav.setViewName("views/imperator/unitBalance");
	        return mav;
    }
	@GetMapping(value={"/balanceDetail"})
    public ModelAndView balanceDetail(HttpServletRequest request,@RequestParam(name = "id", required = false) Integer group_id) {
		 
		ModelAndView mav = new ModelAndView(); 
		 if (group_id ==null) group_id=0;
	        List<GroupUnitVO> groupUnitList = mainService.getAllGroupUnitByGroupId(group_id);
	        for(int i=0;i<groupUnitList.size();i++) {
	        	groupUnitList.get(i).setToggle(true);
	        	List<CounterVO> counterList = mainService.getCounterVObyUnit(groupUnitList.get(i).getId());
	        	if(counterList!=null) {
	        		groupUnitList.get(i).setCounterList(counterList);
	        	}
	        }
	        HttpSession session = request.getSession();
	        BalanceGroupVO sessionInfo =  (BalanceGroupVO) session.getAttribute("author");
	        
	        boolean isAuthor = false;
	        if(sessionInfo!=null && sessionInfo.getId()==group_id) {
	        	isAuthor = true;
	        } 
	        mav.addObject("isAuthor",isAuthor);
	        mav.addObject("groupUnitList", groupUnitList);
	        mav.addObject("group_id",group_id);
	        mav.setViewName("views/imperator/detail");
	        return mav;
    }
	 @ResponseBody
	 @PostMapping(value={"/insertBalanceGroup"})
	 public String insertBalanceGroup(@RequestBody BalanceGroupVO balanceGroupVO, HttpServletRequest request) {	 
		 balanceGroupVO.setPassword(pwEncoder.encode(balanceGroupVO.getPassword()));
	    return mainService.insertBalanceGroup(balanceGroupVO);
	    }   
	 @ResponseBody
	 @PostMapping(value={"/insertCampaign"})
	 public String insertCampaign(@RequestBody CampaignVO campaignVO, HttpServletRequest request) {	 
		 campaignVO.setAdmin_pw(pwEncoder.encode(campaignVO.getAdmin_pw()));
	    return mainService.insertCampaign(campaignVO);
	    }   
	 
	 @ResponseBody
	 @PostMapping(value={"/updateCounter"})
	 public String updateCounter(@RequestBody CounterVO counterVO, HttpServletRequest request) {	 
		 
		 CounterVO excistingCounter = mainService.searchExistingCounter(counterVO);
		
	   if(excistingCounter!=null) {
		   //update
		   counterVO.setId(excistingCounter.getId());
		   mainService.updateCounter(counterVO);
	   }else {
		   //insert
		   mainService.insertCounter(counterVO);
	   }
	    
	    return "success";
	    }   
	 
	 
	 
	 @ResponseBody
	 @PostMapping(value={"/deleteBalanceGroup"})
	 public String deleteBalanceGroup(@RequestBody BalanceGroupVO balanceGroupVO, HttpServletRequest request) {	 
	    return mainService.deleteBalanceGroup(balanceGroupVO);
	    } 
	 @ResponseBody
	 @PostMapping(value={"/updateGroupUnit"})
	 public String updateGroupUnit(@RequestBody GroupUnitVO groupUnitVO, HttpServletRequest request) {	 
		    return mainService.updateGroupUnit(groupUnitVO);
		    }   
	 @ResponseBody
	 @PostMapping(value={"/insertGroupUnit"})
	 public String insertGroupUnit(@RequestBody GroupUnitVO groupUnitVO, HttpServletRequest request) {	 
	    return mainService.insertGroupUnit(groupUnitVO);
	    }   
	 @ResponseBody
	 @PostMapping(value={"/deleteGroupUnit"})
	 public String deleteGroupUnit(@RequestBody GroupUnitVO groupUnitVO, HttpServletRequest request) {	 
	    return mainService.deleteGroupUnit(groupUnitVO);
	    }   
	 @ResponseBody
	 @PostMapping(value={"/login"})
	    private String login(@RequestBody BalanceGroupVO balanceGroupVO,HttpServletRequest request) {
		 
		 	BalanceGroupVO existingBalanceGroup = new BalanceGroupVO();
		    existingBalanceGroup = mainService.verifyAuthor(balanceGroupVO);	        
	        HttpSession session = request.getSession();
	        String rawPw = "";
	        String encodePw = "";

	        if (existingBalanceGroup != null) {
	        	  rawPw = balanceGroupVO.getPassword();
	            String value = pwEncoder.encode(rawPw);
	            if (this.pwEncoder.matches((CharSequence)rawPw, encodePw = existingBalanceGroup.getPassword())) {
	            	  existingBalanceGroup.setPassword("");
	                session.setAttribute("author", (Object)existingBalanceGroup);
	                return "success";
	            }else {
	            	return "fail";
	            }
	        }
	        return "fail";
	    }
}

	 
		


