
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import FormData from 'form-data';

class CloudStorageService {
    constructor() {
        // API Keys (get these from respective websites)
        this.web3StorageToken = process.env.WEB3_STORAGE_API_KEY || 'YOUR_KEY_HERE';
        this.pantryId = process.env.PANTRY_ID || 'YOUR_PANTRY_ID';
        this.gofileApiKey = process.env.GOFILE_API_KEY || 'YOUR_KEY_HERE';
        
        // Initialize clients
        this.web3Client = new Web3Storage({ token: this.web3StorageToken });
    }
    
    // Upload files to Web3.Storage (1TB FREE)
    async uploadToWeb3(files) {
        try {
            const cid = await this.web3Client.put(files);
            console.log(`✅ Web3.Storage: Stored with CID ${cid}`);
            return {
                success: true,
                cid: cid,
                url: `https://${cid}.ipfs.w3s.link/`,
                storage: 'web3.storage',
                size: files.reduce((acc, f) => acc + f.size, 0)
            };
        } catch (error) {
            console.error('❌ Web3.Storage error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Store JSON data in Pantry (FREE unlimited JSON)
    async saveToPantry(basketName, data) {
        try {
            const response = await axios.post(
                `https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/${basketName}`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            );
            
            console.log(`✅ Pantry: Saved to basket '${basketName}'`);
            return {
                success: true,
                basket: basketName,
                storage: 'pantry',
                data: response.data
            };
        } catch (error) {
            console.error('❌ Pantry error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Retrieve JSON data from Pantry
    async getFromPantry(basketName) {
        try {
            const response = await axios.get(
                `https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/${basketName}`
            );
            
            console.log(`✅ Pantry: Retrieved basket '${basketName}'`);
            return {
                success: true,
                basket: basketName,
                data: response.data
            };
        } catch (error) {
            console.error('❌ Pantry retrieval error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Upload to GoFile (unlimited storage)
    async uploadToGoFile(fileBuffer, fileName) {
        try {
            // Get best server
            const serverRes = await axios.get('https://api.gofile.io/getServer');
            const server = serverRes.data.data.server;
            
            // Upload file
            const formData = new FormData();
            formData.append('file', fileBuffer, fileName);
            formData.append('token', this.gofileApiKey);
            
            const response = await axios.post(
                `https://${server}.gofile.io/uploadFile`,
                formData
            );
            
            console.log(`✅ GoFile: Uploaded ${fileName}`);
            return {
                success: true,
                downloadPage: response.data.data.downloadPage,
                fileId: response.data.data.fileId,
                storage: 'gofile'
            };
        } catch (error) {
            console.error('❌ GoFile error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Temporary file sharing with File.io
    async uploadToFileIO(fileBuffer, fileName) {
        try {
            const formData = new FormData();
            formData.append('file', fileBuffer, fileName);
            
            const response = await axios.post('https://file.io', formData);
            
            console.log(`✅ File.io: Temporary link created`);
            return {
                success: true,
                link: response.data.link,
                expiry: '14 days or after first download',
                storage: 'file.io'
            };
        } catch (error) {
            console.error('❌ File.io error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Smart storage router - chooses best service
    async smartUpload(data, options = {}) {
        const { type, size, permanence } = options;
        
        // JSON data -> Pantry
        if (type === 'json') {
            return this.saveToPantry(options.name || 'default', data);
        }
        
        // Large files or permanent -> Web3.Storage
        if (permanence === 'permanent' || size > 100 * 1024 * 1024) {
            return this.uploadToWeb3([data]);
        }
        
        // Temporary files -> File.io
        if (permanence === 'temporary') {
            return this.uploadToFileIO(data, options.name);
        }
        
        // Default -> GoFile
        return this.uploadToGoFile(data, options.name);
    }
}

export default CloudStorageService;
