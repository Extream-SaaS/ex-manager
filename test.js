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
    "socketId": "pJYHq-G3WNiwm8DcAACd",
    "user": {
        "public_id": "5145440f-8cd3-4e68-a20e-181158c56342"
    }
}
*/
manage({
  data: 'ewogICAgImFjdGlvbiI6ICJvcmdhbmlzYXRpb24iLAogICAgImNvbW1hbmQiOiAiY3JlYXRlIiwKICAgICJwYXlsb2FkIjogewogICAgICAgICJuYW1lIjogIm9yZ2FuaXNhdGlvbi1uYW1lIiwKICAgICAgICAid2Vic2l0ZSI6ICJ3d3cuZXhhbXBsZS5jb20iLAogICAgICAgICJwcmltYXJ5X2NvbnRhY3QiOiB7CiAgICAgICAgICAgICJpZCI6ICI1MTQ1NDQwZi04Y2QzLTRlNjgtYTIwZS0xODExNThjNTYzNDIiCiAgICAgICAgfQogICAgfSwKICAgICJkb21haW4iOiAiYWRtaW4iLAogICAgInNvY2tldElkIjogInBKWUhxLUczV05pd204RGNBQUNkIiwKICAgICJ1c2VyIjogewogICAgICAgICJwdWJsaWNfaWQiOiAiNTE0NTQ0MGYtOGNkMy00ZTY4LWEyMGUtMTgxMTU4YzU2MzQyIgogICAgfQp9'
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
}, null);
