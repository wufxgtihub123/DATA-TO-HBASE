//package com.hbase;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.MasterNotRunningException;
import org.apache.hadoop.hbase.ZooKeeperConnectionException;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HBaseAdmin;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.util.Bytes;

public class HbaseStart
{
	static public void main(String args[]) throws IOException {
		
		//createTable();
		//insertTable();
retrieveTable();
		//deleteTable();
		}
	
	
	public static void createTable() throws IOException
	{
		Configuration config = HBaseConfiguration.create();		 
		config.clear();
		 config.set("hbase.zookeeper.quorum", "134.193.136.147");
        config.set("hbase.zookeeper.property.clientPort","2181");
        config.set("hbase.master", "134.193.136.147:60010");
		HBaseAdmin admin = new HBaseAdmin(config);
		
		try {
			 HBaseConfiguration hc = new HBaseConfiguration(new Configuration());
			
			  HTableDescriptor ht = new HTableDescriptor("KishoreLab2"); 
			  
			  ht.addFamily( new HColumnDescriptor("geographicalcoordinates"));

			  ht.addFamily( new HColumnDescriptor("Date"));
			  
			  ht.addFamily( new HColumnDescriptor("accelerometer"));
			  
			  ht.addFamily( new HColumnDescriptor("humidity"));
			  
			  ht.addFamily( new HColumnDescriptor("temperature"));
			  
			  //ht.addFamily( new HColumnDescriptor("z"));
			  
			  System.out.println( "connecting" );

			  HBaseAdmin hba = new HBaseAdmin( hc );

			  System.out.println( "Creating Table" );

			  hba.createTable( ht );

			  System.out.println("Done......");
			  
			  	
        } finally {
            admin.close();
        }
		
		
	}
	
	
	public static void insertTable() throws IOException{
	
		Configuration config = HBaseConfiguration.create();		 
		config.clear();
		 config.set("hbase.zookeeper.quorum", "134.193.136.147");
        config.set("hbase.zookeeper.property.clientPort","2181");
        config.set("hbase.master", "134.193.136.147:60010");
         
         String latitude="",longitude="",Date="",x="",y="",z="",h="",t="";
         

		  HTable table = new HTable(config, "KishoreLab2");
	
		  Put p = new Put(Bytes.toBytes("row"));
		  
		  int count=1;
         
        BufferedReader br = null;
         
 		try {
  
 			String sCurrentLine;
  
 			br = new BufferedReader(new FileReader("/home/cloudera/Desktop/sensor_sai1.txt"));
  
 			while ((sCurrentLine = br.readLine()) != null) {
 				
 				if(sCurrentLine.equals(""))
 				{
 					continue;
 				}
 				
 				p = new Put(Bytes.toBytes("row"+count));
 				
 				String[] array = sCurrentLine.split("\t");
 				latitude = array[0];
 				longitude=array[1];
 				Date=array[2];
 				x=array[3];
 				y=array[4];
 				z=array[5];
 				h=array[6];
 				t=array[7];
 		System.out.println(x+y+z+h+t);		
 				  p.add(Bytes.toBytes("geographicalcoordinates"), Bytes.toBytes("latitude"),Bytes.toBytes(latitude));
 				  p.add(Bytes.toBytes("geographicalcoordinates"), Bytes.toBytes("longitude"),Bytes.toBytes(longitude));
 				  
 				 p.add(Bytes.toBytes("Date"), Bytes.toBytes("d"),Bytes.toBytes(Date));
 				 
 				 p.add(Bytes.toBytes("accelerometer"), Bytes.toBytes("x"),Bytes.toBytes(x));
 				 p.add(Bytes.toBytes("accelerometer"), Bytes.toBytes("y"),Bytes.toBytes(y));

 				 p.add(Bytes.toBytes("accelerometer"), Bytes.toBytes("z"),Bytes.toBytes(z));

 				 p.add(Bytes.toBytes("humidity"), Bytes.toBytes("h"),Bytes.toBytes(h));
 				 
 				p.add(Bytes.toBytes("temperature"), Bytes.toBytes("t"),Bytes.toBytes(t));
 				
 				//p.add(Bytes.toBytes("z"), Bytes.toBytes("col"+(count+5)),Bytes.toBytes(z));

 			      table.put(p);
 			      
 			      count=count+1;
 				
 			}
  
 		} catch (IOException e) {
 			e.printStackTrace();
 		} finally {
 			try {
 				if (br != null)br.close();
 			} catch (IOException ex) {
 				ex.printStackTrace();
 			}
 		}
         
         
		
		
	  
	    
	}
	
	
	public static void retrieveTable() throws IOException{
		
		Configuration config = HBaseConfiguration.create();		 
		config.clear();
         config.set("hbase.zookeeper.quorum", "134.193.136.147");
         config.set("hbase.zookeeper.property.clientPort","2181");
         config.set("hbase.master", "134.193.136.147:60010");
		
		
		  HTable table = new HTable(config, "KishoreLab2");
		
		 Get g = new Get(Bytes.toBytes("row24"));

		  Result r = table.get(g);

		  byte [] value = r.getValue(Bytes.toBytes("geographicalcoordinates"),Bytes.toBytes("latitude"));

		  byte [] value1 = r.getValue(Bytes.toBytes("geographicalcoordinates"),Bytes.toBytes("longitude"));

		  byte [] value2 = r.getValue(Bytes.toBytes("Date"),Bytes.toBytes("d"));
		  
		  byte [] value3 = r.getValue(Bytes.toBytes("accelerometer"),Bytes.toBytes("x"));
		  
		  byte [] value4 = r.getValue(Bytes.toBytes("accelerometer"),Bytes.toBytes("y"));
		  
		  byte [] value5 = r.getValue(Bytes.toBytes("accelerometer"),Bytes.toBytes("z"));
		  byte [] value6 = r.getValue(Bytes.toBytes("humidity"),Bytes.toBytes("h"));

		  byte [] value7 = r.getValue(Bytes.toBytes("temperature"),Bytes.toBytes("t"));

		  String valueStr = Bytes.toString(value);

		  String valueStr1 = Bytes.toString(value1);
		  
		  String valueStr2 = Bytes.toString(value2);
		  
		  String valueStr3 = Bytes.toString(value3);
		  
		  String valueStr4 = Bytes.toString(value4);
		  
		  String valueStr5 = Bytes.toString(value5);
		  String valueStr6 = Bytes.toString(value6);
		  String valueStr7 = Bytes.toString(value7);

		  System.out.println("GET: " +"latitude: "+ valueStr+"longitude: "+valueStr1);
		  System.out.println("GET: " +"Date: "+ valueStr2);
		  System.out.println("GET: " +"x: "+ valueStr3);
		  System.out.println("GET: " +"y: "+ valueStr4);
		  System.out.println("GET: " +"z: "+ valueStr5);
		  System.out.println("GET: " +"humidity: "+ valueStr6);
		  System.out.println("GET: " +"temperature: "+ valueStr7);


		  

		  Scan s = new Scan();

		  s.addColumn(Bytes.toBytes("humidity"), Bytes.toBytes("h"));

		  s.addColumn(Bytes.toBytes("temperature"), Bytes.toBytes("t"));

		  s.addColumn(Bytes.toBytes("Date"), Bytes.toBytes("d"));

		  
		  ResultScanner scanner = table.getScanner(s);

		  try
		  {
		   for (Result rr = scanner.next(); rr != null; rr = scanner.next())
		   {
		    System.out.println("Found row : " + rr);
		    //byte []res=rr.getValue(Bytes.toBytes("humidity"), Bytes.toBytes("h"));
//		    System.out.println(res.toString());
		   // byte[] st=rr.getRow();
		    
		    System.out.println("Humidity values are "+Bytes.toString(rr.getValue(Bytes.toBytes("humidity"), Bytes.toBytes("h"))));
		    System.out.println("Temperature values are "+Bytes.toString(rr.getValue(Bytes.toBytes("temperature"), Bytes.toBytes("t"))));
		   // System.out.println("Humidity values are "+Bytes.toString(rr.getValue(Bytes.toBytes("humidity"), Bytes.toBytes("h"))));

		    		   }
		  } finally
		  {
		   // Make sure you close your scanners when you are done!
		   scanner.close();
		  }
		
	}
	
	
	public static void deleteTable() throws IOException{
		
		Configuration config = HBaseConfiguration.create();		 
		config.clear();
         config.set("hbase.zookeeper.quorum", "134.193.136.147");
         config.set("hbase.zookeeper.property.clientPort","2181");
         config.set("hbase.master", "134.193.136.147:60010");
         
         HBaseAdmin admin = new HBaseAdmin(config);
         admin.disableTable("KishoreLab2");
         admin.deleteTable("KishoreLab2");
         System.out.println("deleted table successfully");

	}
}

