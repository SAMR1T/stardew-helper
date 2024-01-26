"""
Author: Samrit Dhesi
Date: 1/25/2024
The following code uses the contents from the following table on the Cooking page of the Stardew Valley Wiki.
The HTML contents are copy and pasted into a text doc that is then parsed to create the recipes.json file.
<table class ="wikitable sortable roudedboarder jquery-tablesorter">...<table>
"""
import os
import json

with open('public\\helper\\cooking.txt', 'r') as input_file:
    content = input_file.read()
    output_list = []

    sections = content.split("\n\n\n\n")

    # remove default "images" as first result
    sections.pop(0)

    # determine the recipe name and it's ingredients
    for i, section in enumerate(sections):
        ingredients = []
        ingredients_count = []

        results = section.split('\n')

        # string that we will extract recipe name from
        recipe_name_pre_trim = results[3].strip("</a>")

        # find the rightmost occurrence of '>'
        index_of_greater_than = recipe_name_pre_trim.rfind('>')
        if index_of_greater_than != -1:
            recipe = recipe_name_pre_trim[index_of_greater_than + 1:].strip()
        #print(recipe)

        # next we'll get the ingredients
        ingredients_line_pre_trim = results[7].split('<img alt="')
        ingredients_line_pre_trim.pop(0)
        #print(ingredients_line_pre_trim)

        # find the leftmost occurrence of '.'
        for z, sub_ingredient in enumerate(ingredients_line_pre_trim):
            ingredient_name_split = sub_ingredient.split('.')
            ingredients.append(ingredient_name_split[0])
        #print(ingredients)

        #get the counts of how many of each ingredient we need
        ingredients_count_pre_trim = results[7].split('(')
        ingredients_count_pre_trim.pop(0)
        #print(ingredients_count_pre_trim)

        # find the leftmost occurrence of '.'
        for j, sub_count in enumerate(ingredients_count_pre_trim):
            ingredient_count_split = sub_count.split(')')
            if ingredient_count_split[0] != 'Any':
                ingredients_count.append(ingredient_count_split[0])
        #print(ingredients_count)

        # now for this data, we need to create an output dictionary to json
        keys = ['recipe', 'ingredients', 'count']
        values = [recipe, ingredients, ingredients_count]
        output_dict = {}

        for key, value in zip(keys, values):
            output_dict[key] = value
        output_list.append(output_dict)
        #print(output_list)
        print("\n---\n")  # Add a separator between sections

    print(output_list)

    json_data = json.dumps(output_list, indent=4)
    json_filename = 'public\\helper\\output.json'
    with open(json_filename, 'w') as json_file:
        json_file.write(json_data)
