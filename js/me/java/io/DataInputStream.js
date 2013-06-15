js2me.createClass({
	_init$Ljava_io_InputStream_$V: function (stream) {
		this.stream = stream;
	},
	$mark$I$V: function (n) {
		this.stream.$mark$I$V(n);
	},
	$markSupported$$Z: function () {
		return this.stream.$markSupported$$Z();
	},
	$readByte$$B: function () {
		var value = this.stream.$read$$I();
		if (value == -1) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		if (value >= 128) {
			value -= 256;
		}
		return value;
	},
	$readChar$$C: function () {
		return this.$readUnsignedShort$$I();
	},
	$readDouble$$D: function () {
		var hiData = this.readUnsignedInt();
		var loData = this.readUnsignedInt();
		return js2me.dataToDouble(hiData, loData);
	},
	$readFloat$$F: function () {
		var data = this.readUnsignedInt();
		return js2me.dataToFloat(data);
	},
	$readShort$$S: function () {
		var a = this.stream.$read$$I() 
		var b = this.stream.$read$$I();
		if (a == -1 || b == -1) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		var value = (a << 8) + b;
		if (value >= 0x8000) {
			value -= 0x10000;
		}
		return value;
	},
	$readInt$$I: function () {
		var value = 0;
		for (var i = 0; i < 4; i++) {
			value = value << 8;
			var byte = this.stream.$read$$I();
			if (byte == -1) {
				throw new javaRoot.$java.$io.$EOFException();
			} 
			value += byte;
		}
		if (value >= 0x80000000) {
			value -= 0x100000000;
		}
		return value;
	},
	
	$readUnsignedByte$$I: function () {
		var value = this.stream.$read$$I();
		if (value == -1) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		return value;
	},
	$readUnsignedShort$$I: function () {
		var a = this.stream.$read$$I();
		var b = this.stream.$read$$I();
		if (a == -1 || b == -1) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		return (a << 8) + b;
	},
	$readBoolean$$Z: function () {
		var byte = this.stream.$read$$I();
		if (byte == 0) {
			return 0;
		}
		if (byte > 0) {
			return 1;
		}
		if (byte < 0) {
			throw new javaRoot.$java.$io.$EOFException();
		}
	},
	$readLong$$J: function () {
		return new js2me.Long(this.readUnsignedInt(), this.readUnsignedInt());
	},
	$readFully$_B$V: function (buffer) {
		if (buffer == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.$readFully$_BII$V(buffer, 0, buffer.length);
	},
	$readFully$_BII$V: function (buffer, offset, length) {
		if (buffer == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (offset + length > buffer.length) {
			length = buffer.length - offset;
		}
		if (this.stream.$read$_BII$I(buffer, offset, length) < length) {
			throw new javaRoot.$java.$io.$EOFException();
		}
	},
	$readUTF$$Ljava_lang_String_: function () {
		var length = this.$readUnsignedShort$$I();
		var buffer = [];
		if (this.stream.$read$_BII$I(buffer, 0, length) < length) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		var result = js2me.UTF8ToString(buffer);
		if (result == null) {
			throw new javaRoot.$java.$io.$UTFDataFormatException();
		}
		return new javaRoot.$java.$lang.$String(result);
	},
	$reset$$V: function () {
		this.stream.$reset$$V();
	},
	$skip$J$J: function (n) {
		return this.stream.$skip$J$J(n);
	},
	$skipBytes$I$I: function (n) {
		return this.$skip$J$J(new js2me.Long(0, n)).lo;
	},
	$available$$I: function () {
		return this.stream.$available$$I();
	},
	$read$$I: function () {
		return this.stream.$read$$I();
	},
	readUnsignedInt: function () {
		var value = this.$readInt$$I();
		if (value < 0) {
			value += 0x100000000;
		}
		return value;
	},
	superClass: 'javaRoot.$java.$io.$InputStream'
});

