

Dynamic and Multi-Faceted Spatio-Temporal Deep Leanrning for Traffic Speed Forecasting:


##GNN is widely used for traffic research forecasting. 
# Static Adjacency graph  is often you  to model different network even though traffic flow, speed and componnets is dynamic. 

---- Dynamic GNN is used for traffic but exiting papers use static adjacency graphs when working/building DGNN for traffic forecasting. 
--- The paper noted that Since traffic is dynamic and DGNN matrix should be dynamic too and once can learn this to help forecast traffic. 
--- They went on to look at the relationship between traffic and speed and drop the graph of speed flow for a time window (eg 6am to 6pm) superposed graph. 

--- They found out that speed and flow have a relationship with regards to traffic dynamics:

--- At High traffic peek, speed was almost the the lowest and this maps directly to morning rush hours
--- Same thing can be attributed to evening time rush hour. In their word 
Since they found this out which is an obvious thing, they can't design a general GNN to solve/ forecast traffic due to below: 
(However, it is a nontrivial endeavor to design such a dynamic and multi-faceted traffic speed forecasting method due to the following challenges: First, traffic speed of multiple road segments follows a dynamic and implicit spatial pattern. Hand-designed spatial graph is easy to interpret but could not really reflect the interaction relationship. Second, generating a graph for each time slot through existing selflearned methods would introduce plenty of parameters making it hardtocoverage. Third, it is difficult to modeltheeffectsofauxiliary information on traffic speed forecasting, as the impact may also have spatio-temporal characteristics.)

They then presented DMSTGCN: 
#Model dynamic spatial relatinship of segments using tensor decomposition. to take periodicity and dynamic characteristics of traffic 
#Dynamic Graph Convolution to capture varying spatial dependencies in multi faceted data. 
In a nutshell they designed several parallel of several dynamic graphs. 

Model Speed and other correlation eg flow as a set of real numbers. $V_a = {s1,s1,....sn.N_a} where N_a is the number of segment. 

One set of segment as the node with different edges at dirrent time. So if X = segment of Nodes, then it has edge E_t at time t. G_t = { V, E_t}. One vertice connecting different time frames of edges. where those time 
frames of edges are dynamic correlations of road features and a segment. eg; What relationship does this road A has with speed and flow at time t. eg congestion , free flow. 
--Rather two complex and almost abandoned proposal due to complexity but came back with a fluck that they later cited. 


##Coupled Layer-wise Graph Convolution for Transportation Demand Prediction: ---2021 AAAI
---Problem: Old approch GNN use static Adjacency matrix
---Proposal: Different adjacency matrix in different layer, all self learened during trainning. 
----Chained these matrix together 

-----Tested on real word data.




NG: I need to investigate these data and see what they compresed off? and whay they measure ? 


---

Dish-TS: A General Paradigm for Alleviating Distribution Shift in Time Series Forecasting --2023AAAI
--There exist a distrubution shift in Timeseries not well captured by research in literature. 
--Time series have lookback window  and forecast horizon. therefore there is 
#1 intra space shift; ditribution between the input space keep shifting overtime
#2 inter space shift; Distribution shift between the input space and output space. 
--------there needs NN architecture that will lean this shift (like an extimation: they call it CONET; coefficient Net).
Map input sequence into learnable distribution coefficient. so for each distribution; this is the coeficient X. to relieve the inter and intra shift. 
Idea: Learn the input distribution: Learn the output distribution
-----Then make this a Dual-CONET. Capture the distribution difference of two spaces by way of learning. 
Then use this to conduct experimentation and show that the work helps models to achieve 20% better inference. 

From the paper
{
• We systematically organize distribution shift in time series
forecasting as intra-space shift and inter-space shift.
• We propose Dish-TS, a general neural paradigm for alleviating
distribution shift in TSF, built upon Dual-CONET
with jointly considering intra-space and inter-space shift.
• To implement Dish-TS, we provide a most simple
and intuitive instance of CONET design with a prior
knowledge-induced training fashion to demonstrate the
effectiveness of this paradigm.
• Extensive experiments over various datasets have shown
our proposed Dish-TS consistently boost current SOTA
models with an average improvement of 28.6% in univariate
forecasting and 21.9% in multivariate forecasting.}






-------My proposal---------------------

Traffic speed forecast at the lane level: 
----Use a DGNN to do this forecast:
----Given a road A - with 5 lanes -
Speed is different at each lanes and it is criminal to use corridor level metric to claim winner because speed in L1 is usually totally different from L4. 
Hence the proposal to predict speed at the Lane level
autonomour vehicles can take advantage of this since this can help route planning on the lane level. 




A position paper in trafffic research in with Deep learning Using Graph Neural Network: 

-- Prior work and exisitng work is how science measure growth. However, One might sometimes re-evaluate the fundamentals to understand if these assumptions still hold. 
For example, we did a search in the copus of KDD and Other (Name 4). We found out that the traffic research asssumption and direction is based on the below assumptions:
1. Speed on a road segment 
2. Measuring the error for that road segment with MAE, SMAPE and RMSE
Hwowever, A simple line graph of a road segment eg the popular US101 Pems dataset will show you that 
1. Speed on L1 is never the same with speed on Lane 4 at a time window for a forecasting task. 
However, nearly all the GNN research based their assumption on this forecast because GNN is only suitable at the network scale level. 

To that end, we redunloaded the Original Pems4 data and broke it down to lane level and forecast traffic per lanes:
Our result shows lie lie and even lies that using the corridor level metric is a easy way out for these models to quickly converge their result. 

Odinary Physics based models bits the best model when we use these models to predict traffic at the lane level. 


----We can look at the distribution shift in these lanes to understand that using the same metric to capture then does not make sense. 
---- Plot the Graph using Dis-TS approach page one graph to see the lanes distributions and lable their shift. 





--------Proposal Two----------------
Solid and concrete: Very Strong for KDD, IEEE BigData and IEEE DATA Mining. 
Multi-Graph Convolutional Recurrent Network for Fine-Grained Lane-Level Traffic Flow Imputation: 2022 IEEE BigData Mining Conference. 
-- Flow data mining prediction work. 
----We use Earlang-2S Shifted Earlang to generate the arrivals of vehicles (call if flow generation + Traffic flow imputation style)
--the tau is learned using Dish-TS appraoch of learning distribution of different (inter and intra shift) in time series flow data: 
----------------- Once the tau is learned we use simple IDM with arrivals to generate (minning flow counts). Show results per lanes for PEMS data.
We can position this as a way to mine flow counts at the lane level. 
Challenge will be: How to make sure that we replicate missing values (those windows well). 
Challenge2: Need to be reproducible. 