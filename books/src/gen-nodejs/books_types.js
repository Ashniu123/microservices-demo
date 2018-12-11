//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
ttypes.SortOrder = {
  'ASC' : 1,
  'DESC' : -1
};
ttypes.SortBy = {
  'CREATED_AT' : 1,
  'NAME' : 2,
  'COST' : 3,
  'AUTHOR' : 4,
  'UPDATED_AT' : 5,
  'ANY' : 6
};
ttypes.SuccessCode = {
  'SUCCESS' : 1,
  'BOOK_CREATED' : 2,
  'BOOK_UPDATED' : 3,
  'BOOK_DELETED' : 4
};
ttypes.ErrorCode = {
  'SOMETHING_WRONG' : 1,
  'UNAUTHORISED' : 2,
  'NOT_FOUND' : 3,
  'INVALID_DATA' : 4
};
var Book = module.exports.Book = function(args) {
  this.id = null;
  this.name = null;
  this.description = null;
  this.author = null;
  this.cost = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.__v = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.description !== undefined && args.description !== null) {
      this.description = args.description;
    }
    if (args.author !== undefined && args.author !== null) {
      this.author = args.author;
    }
    if (args.cost !== undefined && args.cost !== null) {
      this.cost = args.cost;
    }
    if (args.createdAt !== undefined && args.createdAt !== null) {
      this.createdAt = args.createdAt;
    }
    if (args.updatedAt !== undefined && args.updatedAt !== null) {
      this.updatedAt = args.updatedAt;
    }
    if (args.__v !== undefined && args.__v !== null) {
      this.__v = args.__v;
    }
  }
};
Book.prototype = {};
Book.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.id = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.description = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.author = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.cost = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 31:
      if (ftype == Thrift.Type.STRING) {
        this.createdAt = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 32:
      if (ftype == Thrift.Type.STRING) {
        this.updatedAt = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 33:
      if (ftype == Thrift.Type.I32) {
        this.__v = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Book.prototype.write = function(output) {
  output.writeStructBegin('Book');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.STRING, 1);
    output.writeString(this.id);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 2);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.description !== null && this.description !== undefined) {
    output.writeFieldBegin('description', Thrift.Type.STRING, 3);
    output.writeString(this.description);
    output.writeFieldEnd();
  }
  if (this.author !== null && this.author !== undefined) {
    output.writeFieldBegin('author', Thrift.Type.STRING, 4);
    output.writeString(this.author);
    output.writeFieldEnd();
  }
  if (this.cost !== null && this.cost !== undefined) {
    output.writeFieldBegin('cost', Thrift.Type.I32, 5);
    output.writeI32(this.cost);
    output.writeFieldEnd();
  }
  if (this.createdAt !== null && this.createdAt !== undefined) {
    output.writeFieldBegin('createdAt', Thrift.Type.STRING, 31);
    output.writeString(this.createdAt);
    output.writeFieldEnd();
  }
  if (this.updatedAt !== null && this.updatedAt !== undefined) {
    output.writeFieldBegin('updatedAt', Thrift.Type.STRING, 32);
    output.writeString(this.updatedAt);
    output.writeFieldEnd();
  }
  if (this.__v !== null && this.__v !== undefined) {
    output.writeFieldBegin('__v', Thrift.Type.I32, 33);
    output.writeI32(this.__v);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var BookFilter = module.exports.BookFilter = function(args) {
  this.bookId = null;
  this.name = null;
  this.description = null;
  this.author = null;
  this.lteCost = null;
  this.gteCost = null;
  this.lteCreatedAt = null;
  this.gteCreatedAt = null;
  this.lteUpdatedAt = null;
  this.gteUpdatedAt = null;
  if (args) {
    if (args.bookId !== undefined && args.bookId !== null) {
      this.bookId = args.bookId;
    }
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.description !== undefined && args.description !== null) {
      this.description = args.description;
    }
    if (args.author !== undefined && args.author !== null) {
      this.author = args.author;
    }
    if (args.lteCost !== undefined && args.lteCost !== null) {
      this.lteCost = args.lteCost;
    }
    if (args.gteCost !== undefined && args.gteCost !== null) {
      this.gteCost = args.gteCost;
    }
    if (args.lteCreatedAt !== undefined && args.lteCreatedAt !== null) {
      this.lteCreatedAt = args.lteCreatedAt;
    }
    if (args.gteCreatedAt !== undefined && args.gteCreatedAt !== null) {
      this.gteCreatedAt = args.gteCreatedAt;
    }
    if (args.lteUpdatedAt !== undefined && args.lteUpdatedAt !== null) {
      this.lteUpdatedAt = args.lteUpdatedAt;
    }
    if (args.gteUpdatedAt !== undefined && args.gteUpdatedAt !== null) {
      this.gteUpdatedAt = args.gteUpdatedAt;
    }
  }
};
BookFilter.prototype = {};
BookFilter.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.bookId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.description = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.author = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.lteCost = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.I32) {
        this.gteCost = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 31:
      if (ftype == Thrift.Type.STRING) {
        this.lteCreatedAt = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 32:
      if (ftype == Thrift.Type.STRING) {
        this.gteCreatedAt = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 33:
      if (ftype == Thrift.Type.STRING) {
        this.lteUpdatedAt = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 34:
      if (ftype == Thrift.Type.STRING) {
        this.gteUpdatedAt = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BookFilter.prototype.write = function(output) {
  output.writeStructBegin('BookFilter');
  if (this.bookId !== null && this.bookId !== undefined) {
    output.writeFieldBegin('bookId', Thrift.Type.STRING, 1);
    output.writeString(this.bookId);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 2);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.description !== null && this.description !== undefined) {
    output.writeFieldBegin('description', Thrift.Type.STRING, 3);
    output.writeString(this.description);
    output.writeFieldEnd();
  }
  if (this.author !== null && this.author !== undefined) {
    output.writeFieldBegin('author', Thrift.Type.STRING, 4);
    output.writeString(this.author);
    output.writeFieldEnd();
  }
  if (this.lteCost !== null && this.lteCost !== undefined) {
    output.writeFieldBegin('lteCost', Thrift.Type.I32, 5);
    output.writeI32(this.lteCost);
    output.writeFieldEnd();
  }
  if (this.gteCost !== null && this.gteCost !== undefined) {
    output.writeFieldBegin('gteCost', Thrift.Type.I32, 6);
    output.writeI32(this.gteCost);
    output.writeFieldEnd();
  }
  if (this.lteCreatedAt !== null && this.lteCreatedAt !== undefined) {
    output.writeFieldBegin('lteCreatedAt', Thrift.Type.STRING, 31);
    output.writeString(this.lteCreatedAt);
    output.writeFieldEnd();
  }
  if (this.gteCreatedAt !== null && this.gteCreatedAt !== undefined) {
    output.writeFieldBegin('gteCreatedAt', Thrift.Type.STRING, 32);
    output.writeString(this.gteCreatedAt);
    output.writeFieldEnd();
  }
  if (this.lteUpdatedAt !== null && this.lteUpdatedAt !== undefined) {
    output.writeFieldBegin('lteUpdatedAt', Thrift.Type.STRING, 33);
    output.writeString(this.lteUpdatedAt);
    output.writeFieldEnd();
  }
  if (this.gteUpdatedAt !== null && this.gteUpdatedAt !== undefined) {
    output.writeFieldBegin('gteUpdatedAt', Thrift.Type.STRING, 34);
    output.writeString(this.gteUpdatedAt);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CreateBookRequest = module.exports.CreateBookRequest = function(args) {
  this.name = null;
  this.author = null;
  this.description = null;
  this.cost = null;
  if (args) {
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.author !== undefined && args.author !== null) {
      this.author = args.author;
    }
    if (args.description !== undefined && args.description !== null) {
      this.description = args.description;
    }
    if (args.cost !== undefined && args.cost !== null) {
      this.cost = args.cost;
    }
  }
};
CreateBookRequest.prototype = {};
CreateBookRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.author = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.description = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.cost = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CreateBookRequest.prototype.write = function(output) {
  output.writeStructBegin('CreateBookRequest');
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.author !== null && this.author !== undefined) {
    output.writeFieldBegin('author', Thrift.Type.STRING, 3);
    output.writeString(this.author);
    output.writeFieldEnd();
  }
  if (this.description !== null && this.description !== undefined) {
    output.writeFieldBegin('description', Thrift.Type.STRING, 4);
    output.writeString(this.description);
    output.writeFieldEnd();
  }
  if (this.cost !== null && this.cost !== undefined) {
    output.writeFieldBegin('cost', Thrift.Type.I32, 5);
    output.writeI32(this.cost);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ListBookRequest = module.exports.ListBookRequest = function(args) {
  this.filter = null;
  this.skip = 0;
  this.limit = 20;
  this.sortBy = 1;
  this.sort = -1;
  if (args) {
    if (args.filter !== undefined && args.filter !== null) {
      this.filter = new ttypes.BookFilter(args.filter);
    }
    if (args.skip !== undefined && args.skip !== null) {
      this.skip = args.skip;
    }
    if (args.limit !== undefined && args.limit !== null) {
      this.limit = args.limit;
    }
    if (args.sortBy !== undefined && args.sortBy !== null) {
      this.sortBy = args.sortBy;
    }
    if (args.sort !== undefined && args.sort !== null) {
      this.sort = args.sort;
    }
  }
};
ListBookRequest.prototype = {};
ListBookRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.filter = new ttypes.BookFilter();
        this.filter.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.skip = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.limit = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.sortBy = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.sort = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ListBookRequest.prototype.write = function(output) {
  output.writeStructBegin('ListBookRequest');
  if (this.filter !== null && this.filter !== undefined) {
    output.writeFieldBegin('filter', Thrift.Type.STRUCT, 1);
    this.filter.write(output);
    output.writeFieldEnd();
  }
  if (this.skip !== null && this.skip !== undefined) {
    output.writeFieldBegin('skip', Thrift.Type.I32, 2);
    output.writeI32(this.skip);
    output.writeFieldEnd();
  }
  if (this.limit !== null && this.limit !== undefined) {
    output.writeFieldBegin('limit', Thrift.Type.I32, 3);
    output.writeI32(this.limit);
    output.writeFieldEnd();
  }
  if (this.sortBy !== null && this.sortBy !== undefined) {
    output.writeFieldBegin('sortBy', Thrift.Type.I32, 4);
    output.writeI32(this.sortBy);
    output.writeFieldEnd();
  }
  if (this.sort !== null && this.sort !== undefined) {
    output.writeFieldBegin('sort', Thrift.Type.I32, 5);
    output.writeI32(this.sort);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var UpdateBookRequest = module.exports.UpdateBookRequest = function(args) {
  this.bookId = null;
  this.name = null;
  this.description = null;
  this.cost = null;
  this.author = null;
  if (args) {
    if (args.bookId !== undefined && args.bookId !== null) {
      this.bookId = args.bookId;
    }
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.description !== undefined && args.description !== null) {
      this.description = args.description;
    }
    if (args.cost !== undefined && args.cost !== null) {
      this.cost = args.cost;
    }
    if (args.author !== undefined && args.author !== null) {
      this.author = args.author;
    }
  }
};
UpdateBookRequest.prototype = {};
UpdateBookRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.bookId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.description = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.I32) {
        this.cost = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.author = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UpdateBookRequest.prototype.write = function(output) {
  output.writeStructBegin('UpdateBookRequest');
  if (this.bookId !== null && this.bookId !== undefined) {
    output.writeFieldBegin('bookId', Thrift.Type.STRING, 1);
    output.writeString(this.bookId);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 2);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.description !== null && this.description !== undefined) {
    output.writeFieldBegin('description', Thrift.Type.STRING, 3);
    output.writeString(this.description);
    output.writeFieldEnd();
  }
  if (this.cost !== null && this.cost !== undefined) {
    output.writeFieldBegin('cost', Thrift.Type.I32, 6);
    output.writeI32(this.cost);
    output.writeFieldEnd();
  }
  if (this.author !== null && this.author !== undefined) {
    output.writeFieldBegin('author', Thrift.Type.STRING, 7);
    output.writeString(this.author);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var DeleteBookRequest = module.exports.DeleteBookRequest = function(args) {
  this.bookId = null;
  if (args) {
    if (args.bookId !== undefined && args.bookId !== null) {
      this.bookId = args.bookId;
    }
  }
};
DeleteBookRequest.prototype = {};
DeleteBookRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.bookId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

DeleteBookRequest.prototype.write = function(output) {
  output.writeStructBegin('DeleteBookRequest');
  if (this.bookId !== null && this.bookId !== undefined) {
    output.writeFieldBegin('bookId', Thrift.Type.STRING, 1);
    output.writeString(this.bookId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ResponseStatus = module.exports.ResponseStatus = function(args) {
  this.success = null;
  this.message = null;
  this.code = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field success is unset!');
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
    if (args.code !== undefined && args.code !== null) {
      this.code = args.code;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field code is unset!');
    }
  }
};
ResponseStatus.prototype = {};
ResponseStatus.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.BOOL) {
        this.success = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.code = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ResponseStatus.prototype.write = function(output) {
  output.writeStructBegin('ResponseStatus');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.BOOL, 1);
    output.writeBool(this.success);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.I32, 3);
    output.writeI32(this.code);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CreateBookResponse = module.exports.CreateBookResponse = function(args) {
  this.responseStatus = null;
  this.book = null;
  if (args) {
    if (args.responseStatus !== undefined && args.responseStatus !== null) {
      this.responseStatus = new ttypes.ResponseStatus(args.responseStatus);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field responseStatus is unset!');
    }
    if (args.book !== undefined && args.book !== null) {
      this.book = new ttypes.Book(args.book);
    }
  }
};
CreateBookResponse.prototype = {};
CreateBookResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.responseStatus = new ttypes.ResponseStatus();
        this.responseStatus.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.book = new ttypes.Book();
        this.book.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CreateBookResponse.prototype.write = function(output) {
  output.writeStructBegin('CreateBookResponse');
  if (this.responseStatus !== null && this.responseStatus !== undefined) {
    output.writeFieldBegin('responseStatus', Thrift.Type.STRUCT, 1);
    this.responseStatus.write(output);
    output.writeFieldEnd();
  }
  if (this.book !== null && this.book !== undefined) {
    output.writeFieldBegin('book', Thrift.Type.STRUCT, 2);
    this.book.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var GetBookResponse = module.exports.GetBookResponse = function(args) {
  this.responseStatus = null;
  this.book = null;
  if (args) {
    if (args.responseStatus !== undefined && args.responseStatus !== null) {
      this.responseStatus = new ttypes.ResponseStatus(args.responseStatus);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field responseStatus is unset!');
    }
    if (args.book !== undefined && args.book !== null) {
      this.book = new ttypes.Book(args.book);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field book is unset!');
    }
  }
};
GetBookResponse.prototype = {};
GetBookResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.responseStatus = new ttypes.ResponseStatus();
        this.responseStatus.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.book = new ttypes.Book();
        this.book.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GetBookResponse.prototype.write = function(output) {
  output.writeStructBegin('GetBookResponse');
  if (this.responseStatus !== null && this.responseStatus !== undefined) {
    output.writeFieldBegin('responseStatus', Thrift.Type.STRUCT, 1);
    this.responseStatus.write(output);
    output.writeFieldEnd();
  }
  if (this.book !== null && this.book !== undefined) {
    output.writeFieldBegin('book', Thrift.Type.STRUCT, 2);
    this.book.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ListBookResponse = module.exports.ListBookResponse = function(args) {
  this.responseStatus = null;
  this.books = null;
  this.total = null;
  if (args) {
    if (args.responseStatus !== undefined && args.responseStatus !== null) {
      this.responseStatus = new ttypes.ResponseStatus(args.responseStatus);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field responseStatus is unset!');
    }
    if (args.books !== undefined && args.books !== null) {
      this.books = Thrift.copyList(args.books, [ttypes.Book]);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field books is unset!');
    }
    if (args.total !== undefined && args.total !== null) {
      this.total = args.total;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field total is unset!');
    }
  }
};
ListBookResponse.prototype = {};
ListBookResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.responseStatus = new ttypes.ResponseStatus();
        this.responseStatus.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.books = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new ttypes.Book();
          elem6.read(input);
          this.books.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.total = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ListBookResponse.prototype.write = function(output) {
  output.writeStructBegin('ListBookResponse');
  if (this.responseStatus !== null && this.responseStatus !== undefined) {
    output.writeFieldBegin('responseStatus', Thrift.Type.STRUCT, 1);
    this.responseStatus.write(output);
    output.writeFieldEnd();
  }
  if (this.books !== null && this.books !== undefined) {
    output.writeFieldBegin('books', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.books.length);
    for (var iter7 in this.books)
    {
      if (this.books.hasOwnProperty(iter7))
      {
        iter7 = this.books[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.total !== null && this.total !== undefined) {
    output.writeFieldBegin('total', Thrift.Type.I32, 3);
    output.writeI32(this.total);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var StoreException = module.exports.StoreException = function(args) {
  Thrift.TException.call(this, "StoreException");
  this.name = "StoreException";
  this.code = null;
  this.message = null;
  if (args) {
    if (args.code !== undefined && args.code !== null) {
      this.code = args.code;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field code is unset!');
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(StoreException, Thrift.TException);
StoreException.prototype.name = 'StoreException';
StoreException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.code = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StoreException.prototype.write = function(output) {
  output.writeStructBegin('StoreException');
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.I32, 1);
    output.writeI32(this.code);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var BookException = module.exports.BookException = function(args) {
  Thrift.TException.call(this, "BookException");
  this.name = "BookException";
  this.code = null;
  this.message = null;
  if (args) {
    if (args.code !== undefined && args.code !== null) {
      this.code = args.code;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field code is unset!');
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(BookException, Thrift.TException);
BookException.prototype.name = 'BookException';
BookException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.code = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BookException.prototype.write = function(output) {
  output.writeStructBegin('BookException');
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.I32, 1);
    output.writeI32(this.code);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

