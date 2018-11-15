# Devfolio-Tasks

## Task 1

### 1. Build a multi-column sortable list of tags

I've updated the state on DragEnd, hence my list updates after the component is dragged over its final position, onto the component it will replace. I tried to update my state on DragOver, but it led to data race.

Also, I also explored about how to modify/decorate the ghost image [while dragging](https://kryogenix.org/code/browser/custom-drag-image.html).

I believe I could've achieved the intended effect if I had more time. I guess that's why you use libraries. :P

### 2. The tag input search should display a dropdown of list items populated via the Stack Exchange Tags API

Done, and done. Although it does populate the list with all tags and not just frameworks and programming languages (iOS, design etc.), unlike your personal API that you use. (https://devfolio.co/api/skills/search?q=)


### 3. Save user selected tags with respective priorities to Firebase or any service of your choice.

Firebase is fun :smile:. Never had the opportunity to work with it. Thank You!

### 4. Push Code to Firebase

Completed.

### 5. Host a demo on **surge**
          
[Demo Hosted on **surge**](http://devfolio-task-1.surge.sh/)

## Task II

I've tried to keep the text aligned as much as possible, but due to the sub-pixel problem, it may feel awry, especially when you zoom in. Would've preferred an SVG or PNG perhaps, for that pixel-perfect goodness :rainbow: .

Hope I did a good job. :+1:

[View on Surge](http://devfolio-task-2.surge.sh/)
