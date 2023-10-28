#!/usr/bin/env bash
cd /home/ec2-user/frontend
sudo npm i
sudo npm run start > /home/ec2-user/logs/logs-fe.txt 2> /home/ec2-user/logs/logs-fe.txt < /home/ec2-user/logs/logs-fe.txt &