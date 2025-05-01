import os
import argparse
import datetime
import sys
import uuid
import json
import re

from google.oauth2.credentials import Credentials
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

def generate_keywordPlanid(client, customer_id: str, keywords):
    return add_keyword_plan(client, customer_id, keywords)

def generate_keywordPlanid(client, customer_id:str,keywords,period):
    return add_keyword_plan(client, customer_id,keywords,period)


def add_keyword_plan(client, customer_id:str,keywords,period):
    keyword_plan = create_keyword_plan(client, customer_id,period)
    keyword_plan_campaign = create_keyword_plan_campaign(
        client, customer_id, keyword_plan
    )
    keyword_plan_ad_group = create_keyword_plan_ad_group(
        client, customer_id, keyword_plan_campaign
    )
    create_keyword_plan_ad_group_keywords(
        client, customer_id, keyword_plan_ad_group,keywords
    )
    create_keyword_plan_negative_campaign_keywords(
        client, customer_id, keyword_plan_campaign,keywords
    )
    return keyword_plan

    


def create_keyword_plan(client, customer_id:str,period):
    keyword_plan_service = client.get_service("KeywordPlanService")
    operation = client.get_type("KeywordPlanOperation")
    keyword_plan = operation.create

    keyword_plan.name = f"Keyword plan for traffic estimate {uuid.uuid4()}"
    if period=="week":
        forecast_interval = (
           client.enums.KeywordPlanForecastIntervalEnum.NEXT_WEEK
        )
        return get_keyword_plan(customer_id,keyword_plan,keyword_plan_service,operation,forecast_interval)
    elif period=="month":
        forecast_interval = (
           client.enums.KeywordPlanForecastIntervalEnum.NEXT_MONTH
        )
        return get_keyword_plan(customer_id,keyword_plan,keyword_plan_service,operation,forecast_interval)
    elif period=="quarter":
        forecast_interval = (
           client.enums.KeywordPlanForecastIntervalEnum.NEXT_QUARTER
        )
        return get_keyword_plan(customer_id,keyword_plan,keyword_plan_service,operation,forecast_interval)
    

def get_keyword_plan(customer_id,keyword_plan,keyword_plan_service,operation,forecast_interval):
    keyword_plan.forecast_period.date_interval = forecast_interval

    response = keyword_plan_service.mutate_keyword_plans(
        customer_id=customer_id, operations=[operation]
    )
    resource_name = response.results[0].resource_name
    return resource_name



def create_keyword_plan_campaign(client, customer_id:str, keyword_plan:str):
    keyword_plan_campaign_service = client.get_service(
        "KeywordPlanCampaignService"
    )
    operation = client.get_type("KeywordPlanCampaignOperation")
    keyword_plan_campaign = operation.create

    keyword_plan_campaign.name = f"Keyword plan campaign {uuid.uuid4()}"
    keyword_plan_campaign.cpc_bid_micros = 1000000
    keyword_plan_campaign.keyword_plan = keyword_plan

    network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    keyword_plan_campaign.keyword_plan_network = network

    geo_target = client.get_type("KeywordPlanGeoTarget")
    geo_target.geo_target_constant = "geoTargetConstants/2840"
    keyword_plan_campaign.geo_targets.append(geo_target)

    language = "languageConstants/1000"
    keyword_plan_campaign.language_constants.append(language)

    response = keyword_plan_campaign_service.mutate_keyword_plan_campaigns(
        customer_id=customer_id, operations=[operation]
    )

    resource_name = response.results[0].resource_name

    return resource_name


def create_keyword_plan_ad_group(client, customer_id:str, keyword_plan_campaign:str):
    operation = client.get_type("KeywordPlanAdGroupOperation")
    keyword_plan_ad_group = operation.create

    keyword_plan_ad_group.name = f"Keyword plan ad group {uuid.uuid4()}"
    keyword_plan_ad_group.cpc_bid_micros = 2500000
    keyword_plan_ad_group.keyword_plan_campaign = keyword_plan_campaign

    keyword_plan_ad_group_service = client.get_service(
        "KeywordPlanAdGroupService"
    )
    response = keyword_plan_ad_group_service.mutate_keyword_plan_ad_groups(
        customer_id=customer_id, operations=[operation]
    )

    resource_name = response.results[0].resource_name

    return resource_name


def create_keyword_plan_ad_group_keywords(client, customer_id:str, plan_ad_group:str,keywords):
    keyword_plan_ad_group_keyword_service = client.get_service(
        "KeywordPlanAdGroupKeywordService"
    )
    operations = []

    operation = client.get_type("KeywordPlanAdGroupKeywordOperation")
    keyword_plan_ad_group_keyword1 = operation.create
    keyword_plan_ad_group_keyword1.text = keywords
    keyword_plan_ad_group_keyword1.cpc_bid_micros = 2000000
    keyword_plan_ad_group_keyword1.match_type = (
        client.enums.KeywordMatchTypeEnum.BROAD
    )
    keyword_plan_ad_group_keyword1.keyword_plan_ad_group = plan_ad_group

    operation = client.get_type("KeywordPlanAdGroupKeywordOperation")
    keyword_plan_ad_group_keyword2 = operation.create
    keyword_plan_ad_group_keyword2.text = keywords
    keyword_plan_ad_group_keyword2.cpc_bid_micros = 1500000
    keyword_plan_ad_group_keyword2.match_type = (
        client.enums.KeywordMatchTypeEnum.PHRASE
    )
    keyword_plan_ad_group_keyword2.keyword_plan_ad_group = plan_ad_group
    operations.append(operation)

    operation = client.get_type("KeywordPlanAdGroupKeywordOperation")
    keyword_plan_ad_group_keyword3 = operation.create
    keyword_plan_ad_group_keyword3.text = keywords
    keyword_plan_ad_group_keyword3.cpc_bid_micros = 1990000
    keyword_plan_ad_group_keyword3.match_type = (
        client.enums.KeywordMatchTypeEnum.EXACT
    )
    keyword_plan_ad_group_keyword3.keyword_plan_ad_group = plan_ad_group
    operations.append(operation)

    response = keyword_plan_ad_group_keyword_service.mutate_keyword_plan_ad_group_keywords(
        customer_id=customer_id, operations=operations
    )


def create_keyword_plan_negative_campaign_keywords(
    client, customer_id:str, plan_campaign:str,keywords
):
    keyword_plan_negative_keyword_service = client.get_service(
        "KeywordPlanCampaignKeywordService"
    )
    operation = client.get_type("KeywordPlanCampaignKeywordOperation")

    keyword_plan_campaign_keyword = operation.create
    keyword_plan_campaign_keyword.text = keywords
    keyword_plan_campaign_keyword.match_type = (
        client.enums.KeywordMatchTypeEnum.BROAD
    )
    keyword_plan_campaign_keyword.keyword_plan_campaign = plan_campaign
    keyword_plan_campaign_keyword.negative = True

    response = keyword_plan_negative_keyword_service.mutate_keyword_plan_campaign_keywords(
        customer_id=customer_id, operations=[operation]
    )


def map_locations_ids_to_resource_names(client, location_ids:str):
    build_resource_name = client.get_service(
        "GeoTargetConstantService"
    ).geo_target_constant_path
    return [build_resource_name(location_id) for location_id in location_ids]



def generate_forecast_metrics(client, customer_id:str, keyword_plan_id:str):
   
    keyword_plan_service = client.get_service("KeywordPlanService")
    resource_name = keyword_plan_service.keyword_plan_path(
        customer_id, keyword_plan_id
    )

    response = keyword_plan_service.generate_forecast_metrics(
        keyword_plan=resource_name
    )   
   
    for  forecast_text in enumerate(response.campaign_forecasts):
        def convertTuple(tup):
            return ''.join([str(x) for x in tup])
        
        forecastdata_string = convertTuple(forecast_text)
        forecastdata_string = re.sub('[,\(\)\{\}]', '', forecastdata_string)
        lines = forecastdata_string.split('\n')
        data = {}
        data['keyword_plan_campaign'] = lines[0].split(' ')[-1]
        forecast_data = {}
        
        for line in lines[1:]:
            if ':' in line:
                key, value = line.split(':')
                forecast_data[key.strip()] = float(value.strip())
        
        data['campaign_forecast'] = forecast_data
        json_forecastdata = json.dumps(data, indent=2)
        print(json_forecastdata)

   

if __name__ == "__main__":

    googleads_client = GoogleAdsClient.load_from_storage(version="v13")
    parser = argparse.ArgumentParser(
        description="Adds a campaign for specified customer."
    )

    customer_id = f'{sys.argv[1]}'
    keywords = f'{sys.argv[2]}'
    period = f'{sys.argv[3].lower()}'

    keywordPlan_new = generate_keywordPlanid(googleads_client,customer_id,keywords,period)
    generate_forecast_metrics(googleads_client, customer_id,f'{keywordPlan_new[34:]}')
   

