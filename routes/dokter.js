var express = require('express');
var router = express.Router();
var Dokter=require('../models/Dokter');

// API
router.get('/api/:id?',function(req, res, next){
    if(req.params.id){
        Dokter.getDokterById(req.params.id, function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                if (rows < 1) {
                    res.json({status:false, message:"Gagal", data:rows});
                } else {
                    var jadwal = new Array();
                    // Dokter.getJadwalDokter(req.params.id, function(error, row){
                    //     jadwal = row;
                    // });

                    res.json({status:true, message:"Berhasil", data:{rows, jadwal:jadwal}});
                }
            }
        });
    }
    else{
        Dokter.getAllDokter(function(err, rows){
            if(err)
            {
                res.json({status:false, message:"Gagal", data:err});
            }
            else
            {   
                res.json({status:true, message:"Berhasil", data:rows});
            }
     
        });
    }
});

router.get('/api/jadwal/:id?', function(req, res, next){
    Dokter.getJadwalDokter(req.params.id, function(error, row){
        res.json(row);
    });
});

router.get('/api/poli/:id?',function(req, res, next){
    Dokter.getDokterByIdPoli(req.params.id, function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            if (rows < 1) {
                res.json({status:false, message:"Gagal", data:rows});
            } else {
                res.json({status:true, message:"Berhasil", data:rows});
            }
        }
    });
});

router.post('/api/',function(req, res, next){
    Dokter.addDokter(req.body, function(err, count){
        //console.log(req.body);
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(req.body);//or return count for 1 & 0
        }
    });
});

router.post('/:id',function(req, res, next){
    Dokter.deleteAll(req.body, function(err, count){
        if(err)
        {
          res.json(err);
        }
        else{
          res.json(count);
        }
    });
})

router.delete('/api/:id',function(req, res, next){
    Dokter.deleteDokter(req.params.id, function(err, count){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(count);
        }

    });
});

router.put('/api/:id',function(req,res,next){
    Dokter.updateDokter(req.params.id, req.body, function(err, rows){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

// end API


// view
router.get('/', function(req, res, next) {
  res.render('dokter', { title: 'Dokter' });
});


module.exports=router;