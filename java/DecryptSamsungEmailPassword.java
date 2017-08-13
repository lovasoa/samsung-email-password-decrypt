import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

/*
 * On Samsung devices, username and password in database
 * (/data/data/com.android.email/databases/EmailProvider.db) are encrypted,
 * which is different from official Android version.
 * 
 * It uses AES encryption with a salt value. Fortunately (or unfortunately) the salt
 * value is fixed for all devices :).
 * 
 * This program has been verified on S3 with Android version 4.1.2
 * 
 * Original version by @yajin on github.
 * */

public class DecryptSamsungEmailPassword {

	private static String decrypt(String encodedPassword) throws Exception {
		byte[] encodedBytes = Base64.getDecoder().decode(encodedPassword);

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		byte[] keybytes = new byte[]
			{14,-89,-110,62,-52,110,-105,-97,99,61,4,21,-95,-30,8,113};
		SecretKeySpec seckey = new SecretKeySpec(keybytes, "AES");
		IvParameterSpec ivspec = new IvParameterSpec(new byte[16]);
		cipher.init(Cipher.DECRYPT_MODE, seckey, ivspec);
			
		return new String(cipher.doFinal(encodedBytes));
	}
	
	public static void main(String[] args) {
		
		if (args.length != 1) {
			System.out.println("Usage: ./program  encrypted_string");
			System.exit(1);
		}

		try {
			String plaintext = decrypt(args[0]);
			System.out.println(plaintext);
		} catch (Exception e) {
			e.printStackTrace();
			System.exit(1);
		}
	}
}
