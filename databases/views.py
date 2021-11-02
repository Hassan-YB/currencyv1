from django.db.models.fields import related
from databases.models import *
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
from django.http import JsonResponse
import currency
from django_countries import countries
from google_currency import convert 
import json
import pycountry

def index(request):
    context = {}
    currencies = currency.data._suffix
    currencies.extend(currency.data._no_space)
    context['currencies'] = currencies
    context['countries'] = countries
    return render(request,'databases/index.html',context)

def crowd_currency(request):
    if request.method == "POST":
        context={}
        currencies = currency.data._suffix
        currencies.extend(currency.data._no_space)
        context['currencies'] = currencies
        context['countries'] = countries
        s_country = request.POST['crowd_sender_country']
        r_country = request.POST['crowd_receiver_country']
        s_currency = request.POST['crowd_sender_currency']
        r_currency = request.POST['crowd_receiver_currency']
        amount = request.POST['crowd_amount']
        value = {}
        if s_currency and r_currency and amount:
            response = f'{convert(s_currency,r_currency,int(amount))}'
            value = json.loads(response)
        context['conversion_amount'] = value
        context['amount'] = amount
        return render(request,'databases/index.html',context)
    else:
        return render(request,'databases/index.html')

def convert_currency(request):
    if request.method == "POST":
        data = {}
        amount = request.POST['amount']
        s_currency = request.POST['sender_currency']
        r_currency = request.POST['receiver_currency']
        value = {}
        if s_currency and r_currency and amount:
            response = f'{convert(str(s_currency),str(r_currency),int(amount))}'
            s_unit = f'{convert(str(s_currency),str(r_currency),1)}'
            r_unit = f'{convert(str(r_currency),str(s_currency),1)}'
            value = json.loads(response)
            s_unit_response = json.loads(s_unit) 
            r_unit_response = json.loads(r_unit)
            data['s_unit'] = s_unit_response['amount']
            data['r_unit'] = r_unit_response['amount']
            data['amount'] = value['amount']
            data['success'] = True
        else:
            data['msg'] = "kindly select the sender and receiver country!"
            data['success'] = False
        return JsonResponse(data)

def about(request):
    return render(request,'databases/about.html')