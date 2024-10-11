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
- added feature : changes the content of the modal depending on the state, if the grid is open then go back to the form if the product information is open tthen back to grid (needs ui changes)
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

### 12.09.2024

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
- add images locally in case failed attempt to fetch from pimcore

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

### fixed logo issue on production

### 24.09

### adding a flooroutdoor station

-added functions to add delete

- added flooroutdoor station to structure
- changed the UI for the new strucure

### 25.09

- added missing products
- added Bezeichnung to the table

### 26

- reasearch Gaeb Format
- make a tool to convert excel to xml
- make a excel template for suger

### 27

- icons for PWA
- continued working on the tool

### 30th

- meeting mit Fillipo
- meeting mit Ralf Usenerus
- set the logic for up to 40 apartments
  - #### Audio
    - pes
    - pes pro
    - asi
- changed side bar

### 01.10

- product info page
- adding a pack (for more than 24)
- limit accssesories only to the amount of stations
- a tur opener for every outdoor station

### 2.10

- product info finising
- add pack for more than 1 outdoor station
- add pack for video

### 07.10

- fixed issue with accsssories not showing when going back from overview
- added the texts to indoorstation for product information window
- fixed an issue with outdoor station added quantity
- landing page added

### 08.10

- Camera chnage for Video Pack
- mixed paket  
- Xml gaeb
- minor fixes for landing page

### 09.10

- landing page adjusments
- installabilty

### 10.10

- make a data structure for packs of 24 stations
- deleteing a component of a pack deletes the rest

### 11.10

### detect pre configured packs

- check if the selected products are a pack
- add the pack, show the price
- hide the proces of the other products
