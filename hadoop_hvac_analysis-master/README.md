### First Hands-on experience with Hadoop (MapReduce Paradigm) using Python on Amazon AWS 

By following the example below, you can run the code by typing on the command line:

`cat HVAC.csv | ./HVACmapper.py | sort -k1,1 | ./HVACreducer.py`

Below is an example you can follow how hadoop works: 

Part 1: Create a new Hadoop-specific security group

1. Create a new security group (via the AWS Web console) named "hadoop"
2. Open up SSH access to it from anywhere
3. Open up all TCP (all ports) to custom “this security group” (looks like “sg-6a01e617”)


Part 2: Install Hadoop on EC2 Ubuntu Server 14.04 LTS (HVM)

Boot a “Ubuntu Server 14.04 LTS (HVM)”, t2.xlarge, using your new 'hadoop' security group. DO NOT DO THIS
ON A MICRO!!! Then, SSH to the new VM and do the following:

4. sudo apt-get update
5. sudo apt-get -y install default-jre
6. wget http://www-us.apache.org/dist/hadoop/common/hadoop-2.7.5/hadoop-2.7.5.tar.gz
7. tar xvf hadoop-2.7.5.tar.gz
8. Edit hadoop-2.7.5/etc/hadoop/hadoop-env.sh to point JAVA_HOME at /usr (note: you can use any editor
you want) -- i.e., change this line: “export JAVA_HOME = $(JAVA_HOME)” to: “export JAVA_HOME=/usr”
9. ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa (NOTE: two single-quotes, not a single double-quote a la ")
10. cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
11. ssh localhost (and accept the key)
12. exit (to get out of the 'ssh' from the previous line)

Part 3: Configure Hadoop to run “pseudo-distributed”

13. Edit hadoop-2.7.5/etc/hadoop/core-site.xml to be:

```html
<configuration>
  <property>
    <name> fs.defaultFS</name>
    <value>hdfs://localhost:9000</value>
  </property>
<configuration>
```

14. Edit hadoop-2.7.5/etc/hadoop/hdfs-site.xml to be:

```html
<configuration>
 <property>
 <name>dfs.replication</name>
 <value>1</value>
 </property>
</configuration>
```

15. Create hadoop-2.7.5/etc/hadoop/mapred-site.xml to be:

```html
<configuration>
 <property>
 <name>mapreduce.framework.name</name>
 <value>yarn</value>
 </property>
</configuration>
```

16. Edit hadoop-2.7.5/etc/hadoop/yarn-site.xml to be:

```html
<configuration>
 <property>
 <name>yarn.nodemanager.aux-services</name>
 <value>mapreduce_shuffle</value>
 </property>
</configuration>
```

Part 4: Initialize and boot Hadoop

17. cd hadoop-2.7.5
18. bin/hdfs namenode -format
19. sbin/start-dfs.sh (accept the connection to 0.0.0.0)
20. bin/hdfs dfs -mkdir /user
21. bin/hdfs dfs -mkdir /user/ubuntu
22. sbin/start-yarn.sh

Part 5: Run sample streaming wordcount (python)

23. cd
24. wget http://cs4740-S18.martyhumphrey.info/WCmapper.py
25. wget http://cs4740-S18.martyhumphrey.info/WCreducer.py
26. chmod 755 WCmapper.py
27. chmod 755 WCreducer.py
28. hadoop-2.7.5/bin/hdfs dfs -put hadoop-2.7.5/etc/hadoop CS4740input
29. hadoop-2.7.5/bin/hadoop jar hadoop-2.7.5/share/hadoop/tools/lib/hadoop-streaming-2.7.5.jar -file WCmapper.py -mapper WCmapper.py -file WCreducer.py -reducer WCreducer.py -input CS4740input -output py_wc_out
30. hadoop-2.7.5/bin/hdfs dfs -cat py_wc_out/part-00000 | more (after the job completes)
