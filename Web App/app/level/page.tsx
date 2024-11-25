'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import axios from '@/api/axios';
import Navbar from '@/components/Navbar';

const page = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getRequests = async () => {
            const res = await axios.get('/api/v1/requests/SD/pending', {withCredentials: true});
            console.log(res.data.requests);

            setRequests(res.data.requests);
        }

        getRequests();
    }, []);
  
    return (
      <div className="min-h-screen bg-black p-8">
        <Navbar />
        <Card className="max-w-4xl mx-auto mt-20">
          <CardHeader>
            <CardTitle>Level Upgrade Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{request.userId}</h3>
                          <Badge variant={request.status === 'pending' ? 'secondary' : 
                                       request.status === 'accepted' ? 'default' : 'destructive'}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                        {/* <p className="text-sm text-gray-500">
                          {request.wing} • Level {request.currentLevel} → {request.requestedLevel}
                        </p> */}
                        <p className="text-sm mt-2">{request.proofOfWork}</p>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline" 
                            className="text-green-600"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

export default page