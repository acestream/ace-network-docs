# Traffic filtration

<!--
This section requires review
-->

Starting from version 3.0.2 an ability to filter traffic at special nodes (source, support node and start node) was added. You can filter by IP addresses or by geo targeting. Rules for the filtration should be put in a separate configuration file, path to which is passed in a special node in parameter `--ip-filter-config`.

Configuration file is a text file in JSON format with the following structure:

```
{
 "groups": {
   "<group_1>": {
     "addresses": ["<ip_address_1>", "<ip_address_2>", ...],
     "countries": ["<country_code_1>", "<country_code_2>", ...]
   },
   "<group_2>": {
     "addresses": ["<ip_address_1>", "<ip_address_2>", ...],
     "countries": ["<country_code_1>", "<country_code_2>", ...]
   },
 },
 "blacklist": {
   "addresses": ["<ip_address_1>", "<ip_address_2>", ...],
   "countries": ["<country_code_1>", "<country_code_2>", ...],
   "groups": ["<group_1>", "<group_2>", ...]
 },
 "whitelist": {
   "addresses": ["<ip_address_1>", "<ip_address_2>", ...],
   "countries": ["<country_code_1>", "<country_code_2>", ...],
   "groups": ["<group_1>", "<group_2>", ...]
 },
 "limit_groups": {
   "<group_1>": "30%",
   "<group_2>": "10%"
 }
}
```

Section groups is used to create named groups, that can be referenced in other sections of the file.
Each group may consist of an array ip-addresses (addresses) or country codes (countries).

Array addresses may contain addresses of individual hosts, as well as addresses of subnetworks in the format xx.xx.xx.xx/yy.
At this moment it is allowed to use only subnetworks /24, /16 and /8.

Array countries has to contain country codes in uppercase (according to the base [MaxMind](https://www.maxmind.com/))

Section whitelist sets a white list. The node rejects connections from all addresses that are not included in a white list.

Section blacklist sets a black list. The node rejects connections from all addresses from a black list.

Section limit_groups sets limits on the maximum number of connections for each group (in percentage of the total maximum number of connections).