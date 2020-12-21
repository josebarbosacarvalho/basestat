/* Change following values to your deployment environment */
/* set awsRegion 'eu-west-1' 
 set iamRoleARN 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' 
 set dataBucket 's3://openbase' 
 */
/* https://blog.getdbt.com/how-to-safely-convert-strings-to-integers-in-redshift/ */
copy activity
from 's3://openbase/activities.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy award
from 's3://openbase/awards.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy awardDocument
from 's3://openbase/awardsDocuments.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy awardSupplier
from 's3://openbase/awardsSuppliers.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy buyer
from 's3://openbase/buyers.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy buyerMainActivity
from 's3://openbase/buyers_primarycae.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy buyerAllActivity
from 's3://openbase/buyers_allCae.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy publicContract
from 's3://openbase/contracts.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy party
from 's3://openbase/parties.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy supplier
from 's3://openbase/suppliers.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy supplierMainActivity
from 's3://openbase/suppliers_primarycae.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy supplierAllActivity
from 's3://openbase/suppliers_allCae.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;
copy tender
from 's3://openbase/tenders.txt.gz' credentials 'aws_iam_role=arn:aws:iam::877448023832:role/myRedshiftRole' delimiter '|' region 'eu-west-1' gzip COMPUPDATE ON;