require('dotenv').config();
const { manage } = require('./index');
/*
{
    "action": "organisation",
    "command": "create",
    "payload": {
        "name": "organisation-name",
        "website": "www.example.com",
        "primary_contact": {
            "id": "5145440f-8cd3-4e68-a20e-181158c56342"
        }
    },
    "domain": "admin",
    "socketId": "1234",
    "user": {
        "public_id": "5145440f-8cd3-4e68-a20e-181158c56342"
    }
}
*/
manage({
  data: 'ewogICJhY3Rpb24iOiAib3JnYW5pc2F0aW9uIiwKICAiY29tbWFuZCI6ICJjcmVhdGUiLAogICJwYXlsb2FkIjogewogICJuYW1lIjogIm9yZ2FuaXNhdGlvbi1uYW1lIiwKICAid2Vic2l0ZSI6ICJ3d3cuZXhhbXBsZS5jb20iLAogICJwcmltYXJ5X2NvbnRhY3QiOiB7CiAgICAiaWQiOiAiNTE0NTQ0MGYtOGNkMy00ZTY4LWEyMGUtMTgxMTU4YzU2MzQyIgogIH0KfSwKICAiZG9tYWluIjogImFkbWluIiwKICAic29ja2V0SWQiOiAiMTIzNCIsCiAgInVzZXIiOiB7CiAgICAicHVibGljX2lkIjogIjUxNDU0NDBmLThjZDMtNGU2OC1hMjBlLTE4MTE1OGM1NjM0MiIKICB9Cn0='
}, null);

/*
{
  "action": "organisation",
  "command": "read",
  "payload": { "id": "c90ff860-ad55-47d5-8f9e-fffafe933407" },
  "domain": "admin",
  "socketId": "1234",
  "user": {
    "public_id":  "5145440f-8cd3-4e68-a20e-181158c56342"
  }
}
*/
manage({
    data: 'ewogICJhY3Rpb24iOiAib3JnYW5pc2F0aW9uIiwKICAiY29tbWFuZCI6ICJyZWFkIiwKICAicGF5bG9hZCI6IHsgImlkIjogImM5MGZmODYwLWFkNTUtNDdkNS04ZjllLWZmZmFmZTkzMzQwNyIgfSwKICAiZG9tYWluIjogImFkbWluIiwKICAic29ja2V0SWQiOiAiMTIzNCIsCiAgInVzZXIiOiB7CiAgICAicHVibGljX2lkIjogICI1MTQ1NDQwZi04Y2QzLTRlNjgtYTIwZS0xODExNThjNTYzNDIiCiAgfQp9'
})