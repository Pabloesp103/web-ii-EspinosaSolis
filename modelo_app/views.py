from django.shortcuts import render, get_object_or_404

def mainindex(request):
    return render(request, 'mainindex.html')