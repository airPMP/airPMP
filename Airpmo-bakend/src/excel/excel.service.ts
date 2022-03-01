import { Injectable, NotFoundException, Req, UnprocessableEntityException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';
import { count } from 'console';
import { IS_OBJECT } from 'class-validator';

@Injectable()
export class ExcelService {
  constructor(@InjectModel(excels.name) private excelModel: Model<excelDocument>) { }
  async productiveFile(files: any, @Req() req) {
    const projectid = req.body.projectid
    try {
      var workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
        type: 'buffer',
        cellDates: true,
        cellNF: false,
      });
    } catch {
      throw new NotFoundException("file not found")
    }
    var arr = workBook.SheetNames
    for (let i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element == "productive_sheet")
        var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var jsonData = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })
    }
    else {
      throw new NotFoundException("file not found")
    }
    var user = await this.excelModel.findOne({ project_id: projectid })
    if (!user) {
      if (files[0].fieldname === "productivity" && projectid) {
        var pr = await this.excelModel.create({ productivitysheet: jsonData, project_id: projectid })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }
    else {
      if (files[0].fieldname === "productivity" && projectid) {
        var pro = await this.excelModel.updateOne({ "project_id": projectid }, { productivitysheet: jsonData })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }

  }




  async quantityFile(files, req) {

    const projectid = req.body.projectid
    try {
      var workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
        type: 'buffer',
        cellDates: true,
        cellNF: false,
      });
    } catch {
      throw new NotFoundException("file not found")
    }
    var arr = workBook.SheetNames
    for (let i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element == "quantity_sheet")
        var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var qunatityjsondata = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })

    }
    else {
      throw new NotFoundException("file not found")
    }

    var arrzerokey = Object.keys(qunatityjsondata[0])
    var arrzerovalue = Object.values(qunatityjsondata[0])
    var arronekey = Object.keys(qunatityjsondata[1])
    var arrayonevalue = Object.values(qunatityjsondata[1])

    var count = 0;
    var tier = [];
    var tier0 = []
    var tier01 = []
    var all_tier_info = []
    for (let j = 0; j < arronekey.length; j++) {
      if (j <= 2) {
        tier[arronekey[j]] = arrayonevalue[j]
      }
      else if (arrzerokey[count] === arronekey[j]) {
        if (arrzerokey[count] === arronekey[j]) {
          all_tier_info.push(tier)
          tier = []
        }
        tier[arronekey[j]] = arrayonevalue[j]
        count++;
      }
      else {
        tier[arronekey[j]] = arrayonevalue[j]
      }

    }

    // console.log( all_tier_info)

    var obj3 = []
    var final_array = {}
    var final_array1 = []
    var final_value1 = []

    var k;
    for (let h = 7; h < qunatityjsondata.length; h++) {
      var arrtwokey = Object.keys(qunatityjsondata[h])
      var arraytwovalue = Object.values(qunatityjsondata[h])
      // console.log(arrtwokey,arraytwovalue)
      for (let index = 0; index < all_tier_info.length; index++) {
        var final_key1 = Object.keys(all_tier_info[index])
        final_value1 = Object.values(all_tier_info[index])
          
        for (let i = 0; i < final_key1.length; i++) {
       
          for (let j = 0; j < arrtwokey.length; j++) {
             
            if (final_key1[i] === arrtwokey[j]) {
              // console.log(final_key1[i],arrtwokey[j],i)
              if (i === 0) {
                // console.log(i,final_key1[i])
                // store_key[j] = final_key1[i]
                // final_array = Object.assign(final_array, store_key)
                // console.log(final_array)
                if (Object.keys(final_array).length != 0) {
                  obj3.push(final_array)
                  // store_key = []
                  final_array = {}

                }

              }

              final_array[final_value1[i]] = arraytwovalue[j]
              let zone_subzone = final_key1[i]
              final_array = Object.assign(final_array, { zone_subzone })
            }
          }
        }
      }
    }
    console.log(obj3)
    return qunatityjsondata
    var new_obj_array = []
    var new_object = []
    for (let index = 0; index < obj3.length; index++) {
      let values = Object.values(obj3[index])
      let key = Object.keys(obj3[index])
      if (key[0] === "Activity ID") {
        new_obj_array.push(new_object)
        // console.log(new_obj_array)
        new_object = []
        new_object.push(obj3[index])
        continue;
      }
      new_object.push(obj3[index])

    }
    // console.log(new_obj_array)

    var tier3 = []
    var obj_keys
    var obj_values
    for (let j = 1; j < obj3.length; j++) {
      obj_keys = Object.keys(obj3[j])
      obj_values = Object.values(obj3[j])

      for (let index = 0; index < obj_keys.length; index++) {
        if (obj_keys[index] === arrzerokey[index])
          console.log(obj_values[index])
        tier3[arrzerovalue[index]] = obj_values[index]

      }
    }
    // console.log(tier3)
  }
}

// if (arrzerokey[count] === arronekey[j]) {
      //   if (count != 0) {
      //     all_tier_info.push(tier)
      //     tier = []
      //   }
      //   tier[arronekey[j]] = arrayonevalue[j]
      //   count++;
      // }
      // else {
      //   tier[arronekey[j]] = arrayonevalue[j]
      // }



      // console.log(tier)
    // var all_tier_info_key = Object.keys(all_tier_info)
    // var all_tier_info_key_value = Object.values(all_tier_info)
    // console.log(all_tier_info_key)
    // var obj3 = []
    // var obj4 = []
    // var final_array = []
    // var final_value1 = []

    // for (let i = 0; i < all_tier_info_key.length; i++) {
    //   for (let j = 0; j < arrtwokey.length; j++) {
    //     if (all_tier_info_key[i] === arrtwokey[j]) {
    //       final_array[all_tier_info_key_value[i]] = arraytwovalue[j]
    //       // console.log(all_tier_info_key.length)
    //     }
    //   }

     // let new_object = {
    //   ...obj3[1],...obj3[2]
    //  }
    //  new_object = {
    //   ...obj3[3],...obj3[4]
    //  }
    // var new_object = Object.assign(obj3[1], obj3[2])
    // var new_object = Object.assign(new_object, obj3[3])
    // var new_object = Object.assign(new_object, obj3[4])
    //  console.log(new_object)

