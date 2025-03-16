---
title: Streamlit
slug: Streamlit
sidebar_position: 0
---


# Streamlit

Author：NA

1. Write in Front
2. Files
3. Dataframes
4. Static Elements
5. Session
6. Data Flow
7. Caching
8. Page Layout
9. Theme
10. Chatbot

The

```html
import streamlit as st
import pandas as pd     # read files
```

Streamlit is much more like a purely frontend project in my point of view for there're no GET, POST, ect. methods mentioned.

That is to say, when using streamlit, we tend to embed the whole project backend(what we intend to implement normally), ranging from SQL to web server, into the frontend framework.

## Write in Front

Streamlit is more a fronted script embedded into backend than a pure fronted, without POST, GET, ect.

When you are to arranging elements into a page, the element set by statement at the same ident level are visually in parallel. That is to say, though each code block is run one by one (randered one by one), each element only differs in position, which means the ident level depends the location of the element.

notatioin: "element" refers to such as "button", "selectbox", ect.

## Files

### Upload Files

first we can try a simple example

```html
st.text("hello streamlit")
```

The code above should be run by using command

```html
streamlit run <name>.py
```

to send it to localhost network, or

```html
python -m streanlit run <name>.py
```

as well as python file online

```html
streamlit run https://raw.githubusercontent.com/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py
```

UploadFile:

```html
uploads = st.file_uploader('excel_file', type['xlsx'])
```

e.g. - how to upload image files

```html
img_file = st.file_uploader()
```

## Dataframes

We should learn to display python elements on a websites via streamlit package

write

```html
st.write(<_type_>)
```

e.g.

```html
st.write('here\'s your attempt\n')
st.write(
    pd.DataFrame({
        'A': [1,2,3,4],
        'B': [10,20,30,40]
    })
)
```

elements typed data_fram, error, module, function, dict, ect. are all allowed

for more convenient, we can write like this in python source file:

```html
'hello streamlit --- ', st.session_state
```

When running, it will be printed successfully. (resembles in jupyter)

'write' method will inspect the elements' type set in parenthesis and choose the best way to render it to the app / web. So if the efficiency is needed, use the following ways.

```html
st.dataframe(<pd.DataFrame type>)
st.table(<pd.DataFrame type>)   # for static table generation
```

### dataframe & table

some style details:

```html
df = = pd.DataFrame(
    np.random.randn(10, 20),
    columns=('col %d' % i for i in range(20)))      # declaration
st.dataframe(df.style.highlight_max(axis=0))    # the maximum value will be rendered highlights
```

style details can be set in parameter st.column_config 

### line_chart

From examples above we can learn that streamlit always recieve a element typed DataFrame. If we wanna draw a line chart, just use `st.line_chart()`

```html
import numpy as np
df = pd.DataFrame(
    np.random(20,3),
    columns=['A','B','C']
)
st.line_chart(df)
```

Ccharts will be rendered from DataFrame type in streamlit kernel, so as the type map via st.map()

```html
md = pd.DataFrame(
    np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
    columns=['A','B']
)       # DataFrame type
st.map(md)
```

It is to locate the points coresponds to its coordination on world map.

## Static Elements

We are in need of getting values from frontend, which is called 'widgets'. In streamit there provides three kinds of elements: slider, button, selectbox

### slider

e.g.

```
x = st.slider(label='alpha')        # 'x' is the variable name while 'alpha' is the text displayed on frontend.
st.write(x, 'squared is', x * x)    # resambles "print"
```

(Integer valus exceeding +/- (1&lt;&lt;53)-1 ) cannot be accurately stored or returned by the widget due to serialization constraints between Python server ad Javascript cliend.

Function Signature

```
st.slider(label, min_value=None, max_value=None, value=None, step=None, format=None, key=None, help=None, on_change=None, args=None, kwargs=None, *, disabled=False, label_visibility="visible")
```

### button

Function Signature

```
st.button(label, key=None, help=None, on_click=None, args=None, kwargs=None, *, type="secondary", disabled=False, use_container_width=False) -> bool
```

Usage example:

```
if st.button('Say hello'):
    st.write('Why hello there')
else:
    st.write('Goodbye')
```

It's a boolean variable and we set the action to be done via logical judgement.

### checkbox

It is used to toggle a conditional statement

Function Signature

```
st.checkbox(label, value=False, key=None, help=None, on_change=None, args=None, kwargs=None, *, disabled=False, label_visibility="visible") -> bool
```

example:

```
import streamlit as st
agree = st.checkbox('I agree')
if agree:
    st.write('Great!')
```

### selectbox

Function Signature

```
st.selectbox(label, options, index=0, format_func=special_internal_function, key=None, help=None, on_change=None, args=None, kwargs=None, *, placeholder="Select...", disabled=False, label_visibility="visible")
```

In options, [Sequence, numpy.ndarray, pandas.Series, pandas.DataFrame, pandas.Index] are allowed.

### echo

Function Signature

```
st.echo(code_location="above")
```

It is to decide whether to show the choed code before or after the results of the executed code block.

e.g.

```
with st.echo():
    st.write('This code will be printed')
```

Everything inside the st.echo block will be both printed to the screen and executed.

It's that simple!

### spinner

Function signature

```
st.spinner(text="In progress...")
```

for example:

```
with st.spinner('Wait for it...'):
    time.sleep(5)
st.success('Done!')
```

It handles a message to display while executing the clock inside.

### an Example

let's have a look at an example:

```py
import pandas as pd
import streamlit as st

# Cache the dataframe so it's only loaded once
@st.cache_data
def load_data():
    return pd.DataFrame(
        {
            "first column": [1, 2, 3, 4],
            "second column": [10, 20, 30, 40],
        }
    )

# Boolean to resize the dataframe, stored as a session state variable
st.checkbox("Use container width", value=False, key="use_container_width")

df = load_data()

# Display the dataframe and allow the user to stretch the dataframe
# across the full width of the container, based on the checkbox value
st.dataframe(df, use_container_width=st.session_state.use_container_width)
```

It seems that the 'key' value set in st.checkbox is related to st.dataframe. Or other, parameter 'use_container_width' in st.dataframe was connected to st.checkbox due to the key parameter has been set as the same name.

## Session State

Each time someone opened your app will start a new session and the newly started session will captured by us. And each session is independent.

The function of Session State is to store parameters in each session.

### assignment

When the app rerun, we can set session just like dict.

```py
st.session_state:
{
    "key": "value"
}
```

so goes: we should check if one key is in session_state:

```py
if 'counter' not in st.session_state:
    st.session_state['counter'] = 0
```

Another exaple (another format):

```py
if 'boolean' not in st.session_state:
    st.session_state.boolean = False
```

Thus, variable has been decalred. Show them:

```py
st.write(st.session_state)      # output will in the format of python dict
```

### traversal

traverse keys:

```py
for the_key in st.session_state.keys():
    pass
```

traverse valus:

```py
for the_value in st.session_state.values():
    pass
```

traverse items:

```py
for the_item in st.session_state.items():
    pass
```

delete key:

```py
del st.sessiong_state['a_key']
```

just like the dict

### connect to element

API function, method with parameter 'key' all can be connected. For example:

```py
col1, buff, col2 = st.beta_columns([1,0,5,3])
option_names = ['a','b','c']

option = col1.radio('Pick an option', option_names, key='radio_option')
```

if we omitted key parameter, it will be generated for the widget based on its content.

## Data Flow

Sometimes we want to check elements' work state, thus using callback mechanism.

Callback can be used with widgets using the parameters on_change and on_click, or simply args and kargs.

Widgets which support the on_change event: checkbox, color_picker, date_input, multiselect, number_input, radio, select_slider, selectbox, slider, text_area, text_input, time_input, file_uploader.

Widgets which support the on_click event: button, download_button, form_submit_button

The distinction between above two is that they respond to operations differently.

We should decalre the coresponding callback functions to implement a certain callback.

e.g.

```
def form_callback():
    st.write(st.session_state.my_slider)
    st.write(st.session_state.my_checkbox)
    #  previously set session_state

with st.form(key='my_form'):
    slider_input = st.slider('My slider', 0, 10, 5, key='my_slider')
    checkbox_input = st.checkbox('Yes or No', key='my_checkbox')
    submit_button = st.form_submit_button(label='Submit', on_click=form_callback)
```

As soon as the element responds to our operation, callback function will be execute. We usually use callback to check the information.

## Caching

Cache accelerate the program and allows the app to stay performant even when loading data from web, manipulating large datasets, or performing expensive computations.

To cache a function in Streamlit, you need to decorate it with one of two decorators (st.cache_data and st.cache_resource):

```
@st.cache_data
def long_running_function(param1, param2):
    pass
```

If this is the first time Streamlit sees these parameter values and function code, it runs the function and stores the return value in a cache. The next time the function is called with the same parameters and code (e.g., when a user interacts with the app), Streamlit will skip executing the function altogether and return the cached value instead. During development, the cache updates automatically as the function code changes, ensuring that the latest changes are reflected in the cache.

### st.cache_data

Each time loading data from disk can add caching method and set ttl

```
@st.cache_data(ttl=3600)
def api_call():
    response = requests.get('https://jsonplaceholder.typicode.com/posts/1')
    return response.json()
```

where ttl=3600 tells streamlit invalidates any cached values after 1hour(3600 seconds) and runs the cached function again.

### st.cache_resource

An AI developer should be accustomed to this, which is widely used when loading a model for example

```
from transformers import pipeline
@st.cache_resource  # 👈 Add the caching decorator
def load_model():
    return pipeline("sentiment-analysis")
model = load_model()
query = st.text_input("Your query", value="I love Streamlit! 🎈")
if query:
    result = model(query)[0]  # 👈 Classify the query text
    st.write(result)
```

## Page Layout

### sidebar

We organize the interactive elements into st.sidebar, using object notation and with notation. Each element that passed to sidebar is pinned to the left, allowing users to focus on the content in your app still having access to UI controls.

e.g.

```py
# Object notation
st.sidebar.[element_name]
# "with" notation
with st.sidebar:
    st.[element_name]
```

When we wanna add a selectbox and a radio into sidebar:

```py
# Using object notation
add_selectbox = st.sidebar.selectbox(
    "How would you like to be contacted?",
    ("Email", "Home phone", "Mobile phone")
)
# Using "with" notation
with st.sidebar:
    add_radio = st.radio(
        "Choose a shipping method",
        ("Standard (5-15 days)", "Express (2-5 days)")
    )
```

Additionally, the only elements that aren't supported using object notation are st.echo, st.spinner, and st.toast. To use these elements, you must use with notation.

e.g.

```py
with st.sidebar:
    with st.echo():
        st.write("This code will be printed to the sidebar.")

    with st.spinner("Loading..."):
        time.sleep(5)
    st.success("Done!")
```

For more details, look at the following example:

```py
import streamlit as st

# Add a selectbox to the sidebar:
add_selectbox = st.sidebar.selectbox(
    'How would you like to be contacted?',
    ('Email', 'Home phone', 'Mobile phone')
)

# Add a slider to the sidebar:
add_slider = st.sidebar.slider(
    'Select a range of values',
    0.0, 100.0, (25.0, 75.0)
)
```

Beyond the sidebar, Streamlit offers several other ways to control the layout of your app. st.columns lets you place widgets side-by-side, and st.expander lets you conserve space by hiding away large content.

notation: build frontend via "with" is an important way in a project, every element writen under "with xxx" will be set as a subobject. "xxx" can be "sidebar", "container", etc.

### columns

Function Signature

```py
st.columns(spec, *, gap="small")
```

spec parameter controls the number and width of columns to insert, and gap is one of 'small', 'medium' and 'large', controlling the size of the gap between the columns.

Usage example

```py
left_column, right_column = st.columns(2)
# You can use a column just like st.sidebar:
left_column.button('Press me!')

# Or even better, call Streamlit functions inside a "with" block:
with right_column:
    chosen = st.radio(
        'Sorting hat',
        ("Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"))
    st.write(f"You are in {chosen} house!")
```

using st.columns(2) thus getting two column elements, which can be regarded as two sidebar object (or just st) and use notation with to add interactive elements inside.

a image loader example:

```
import streamlit as st

col1, col2, col3 = st.columns(3)

with col1:
   st.header("A cat")
   st.image("https://static.streamlit.io/examples/cat.jpg")

with col2:
   st.header("A dog")
   st.image("https://static.streamlit.io/examples/dog.jpg")

with col3:
   st.header("An owl")
   st.image("https://static.streamlit.io/examples/owl.jpg")
```

### expander

Function Signature

```
st.expander(label, expanded=False)
```

To see an example:

```
import streamlit as st

st.bar_chart({"data": [1, 5, 2, 6, 2, 1]})

with st.expander("See explanation"):
    st.write(\"\"\"
        The chart above shows some numbers I picked for you.
        I rolled actual dice for these, so they're <em>guaranteed</em> to
        be random.
    \"\"\")
    st.image("https://static.streamlit.io/examples/dice.jpg")
```

The result is that the text is hidden to a box tittled "See explanation", which indicates the function of expander.

In another way to implement the same result

```py
import streamlit as st

st.bar_chart({"data": [1, 5, 2, 6, 2, 1]})

expander = st.expander("See explanation")
expander.write(\"\"\"
    The chart above shows some numbers I picked for you.
    I rolled actual dice for these, so they're <em>guaranteed</em> to
    be random.
\"\"\")
expander.image("https://static.streamlit.io/examples/dice.jpg")
```

## Theme

Basic theme style changing is a biasic function inside the streamli page. In 'Setting' mode. If you want to add your own theme to an app, you can edit on 'setting' page of edit the theme configs.

Streamlit provides four different ways to set configuration options. This list is in reverse order of precedence, i.e. command line flags take precedence over environment variables when the same configuration option is provided multiple times.

configure

global config file path: '~/.streamlit/config.toml' for macOS/Linux or '%userprofile%/.streamlit/config.toml' for windows.

## Chatbot

There is no doubt that LLMs are leading a new tide in AI realm. Streamli provides a practical tool for building our own Chatbot.

You can search "streamlit chatbot" via google and see the official documentation, which provide some detailed examples to build your Chatbot

