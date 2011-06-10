This is a demo of map interaction using Leaflet & HTML5 
& theNounProject Icon integration & CouchDB (w/ GeoJSON data.)

CouchDB will have an API that 

* accepts bounding box data
* returns results by topics
* returns results by titles
* returns any of the following fields (see below)

More information about the Data Standard for groups is here:
http://citygroups.org/data-standard

THE FIELDS ARE:
name (string: textfield)

url (string: link, http://example.com)
email (string: name@email.com)
calendar_url (string: http://example.com)

contact (string: textfield)
source (string: textfield)

description (string: textarea)
notes (string: textarea)
image_url (string: http://example.com)

categories (string, comma separated: term1, term2, term3)
audience_size (string: textfield)
activity_level (string: textfield)
ownership (string: textfield)
type_group (string: textfield, Ex. support group)
type_group_technology (string: textfield, meetup)
type_document (string: textfield, Ex. community_group)

location (string, freeform address that gets geocoded:  123 Street Name St. Apt A Seattle, WA 01234)
neighborhood (string, comma separated: textfield, neighborhood name1, neighborhood name2)
address (string: 123 Street Name St. Apt A)
district (string: textfield)
city (string: textfield)
zipcode (string: textfield 01234-1234)
state (string: textfield)
region (string: textfield)
areacode (string: textfield)
latitude (string: -44.012345) * not sure how many digits this will be
longitude (string: -44.012345)
location_geo (string: WKT data or GeoJSON data.)




Available data once sent through CityGroups:


citygroups_date_commented (string: Sunday, May 15, 2011 - 23:25)
citygroups_date_posted (string: Sun, 05/15/2011 - 23:25)
citygroups_date_updated (string: Sun, 05/15/2011 - 23:25)

citygroups_path (string: http://example.com/path/path1/path2)
citygroups_link_edit  (string: http://example.com/path/path1/path2/edit)
citygroups_nid (string: 1234)

citygroups_author_name (string: textfield)
citygroups_author_uid (string: 1234)
citygroups_author_path (string: http://example.com/path/path1/path2)

citygroups_number_revisions (string: 1234)
citygroups_stats_recommendations (string: 1234)
citygroups_stats_comment_count (string: 1234)
citygroups_stats_badges (string, comma separated: badge1, badge2, badge3)


Probable fields:

(comments?) aka reviews



