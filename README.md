# Konfigurator

### 04.09.2024 Mitwoch

#### Added Outdoor station selection modal for the detailed version

- opens a Modal/Dialog window
- form to select the specifications
- Grid for to display available stations
- pagination

#### Minor fixes

### 05.09.2024 Donnerstag

#### Changed the stepper's Ui

- imporved UI
- Added states for the Current, completed and disabled Step
- Navaigation between steps

### Changes to the notifications when you download

- now the messages that show when you download a file change depending on the theme


### 06.09.2024 Freitag 
#### fixing issues with UI

### 09.09
#### 1 Continuing Selection Modal
- added filter bar to the ui
- added feature : changes the content of the modal depending on the state, if the grid is open then go back to the form if the    product information is open tthen back to grid (needs ui changes)
- created a product information page that shows when the product is clicked
    - it changes the modal from grid to page info
    - basic information and a photo are now able to show
    
- need to be done 
    - find out what information
    - pull the data from pimcore
    - filter the data
    - change the back button to being permenant (need to think how)
    - filterbar needs to be in the grid only and removed when info page is there
    - complete the desgin off the page
#### 2 UI fixes


### 10.09
### trying to understand SugarCrm and PDF Manager

### trying a new sidebar for selected products
- ~~the code broke. fixing ~~(fixed)
- side bar opns when clicked on the icon
- each product in each category is show
- change the number of product (needs to be finished, for now it only changes the quantity of a product it self and it doesnt change the remaning needed number)
- delete the item (needs to be finished) 

### 11.09.2024
- delete slected items from the side cart
- added deatils to the pdf export
### started working on the Sugar angebot template


###  12.09.2024
### working on the Sugar angebot template
- added a table of the products and formatted the template and now it looks better

### 13.09.2024 
### finished The template


### 16.09.2024
### Sugar Api Produkte

### resaerching the Sugar Api
- how to interact
- what are the possiblties
- what data do we need

### 17.09
### changing the logic according to the Program Flow of Ralf
- V2D when only One Station
- both Audio and Video
- changed the filter for searching the products

### 19.09
### found out how to fetch images and display them correctly
- fetch thumbnail from pimcore because images are too big
- add images loccaly in case failed attempt to fetch from pimcore

### 20.09
### finshed sugar template


### 23.09

### Fecthed accsseories
- check all the products and what accsssories they have
- fetch them from pim core
- map the feilds and extract Data
- check if the selected products have accssories
- if selected products have accssories, look for a matching Id and display A card
- add function to acssories 
